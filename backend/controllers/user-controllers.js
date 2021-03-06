const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../schema/user-schema");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not find users.", 500)
    );
  }

  if (!users) {
    return next(
      new HttpError("Something went wrong, Could not find users.", 404)
    );
  }
  res
    .json({ users: users.map((user) => user.toObject({ getters: true })) })
    .status(200);
};

const getUserById = async (req, res, next) => {
  let user;
  const userId = req.params.uid;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not find users.", 500)
    );
  }

  if (!user) {
    return next(
      new HttpError(
        "Something went wrong, Could not find user for provided id.",
        404
      )
    );
  }
  res.json({ user: user.toObject({ getters: true }) }).status(200);
};

const createUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not create user.", 500)
    );
  }
  res.json({ user: createdUser }).status(201);
};

const updateUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;
  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (error) {
    return next(
      new HttpError("Something went wrong wrong, could not update user", 500)
    );
  }
  if (!user) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      404
    );
    return next(error);
  }

  user.name = name;
  user.email = email;
  user.password = password;

  try {
    await (await user).save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong wrong, could not update user", 500)
    );
  }

  res.json({ user: user.toObject({ getters: true }) }).status(200);
};

const deleteUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.uid);
  } catch (error) {
    return next(
      new HttpError("Something went wrong wrong, could not delete user", 500)
    );
  }
  if (!user) {
    return next(new HttpError("Could not find user for provided id.", 404));
  }
  try {
    await user.deleteOne();
  } catch (error) {
    return next(
      new HttpError("Something went wrong wrong, could not delete user", 500)
    );
  }
  res.json({ message: "Deleted place." }).status(200);
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not create user.", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "jay_ambe",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not create user.", 500)
    );
  }

  res
    .json({ userId: createdUser.id, email: createdUser.email, token: token })
    .status(201);
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email, password } = req.body;

  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again.", 500));
  }
  if (!hasUser) {
    return next(new HttpError("Please enter valid credentials.", 422));
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, hasUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Please enter valid credentials.", 422));
  }

  let token;
  try {
    token = jwt.sign({ userId: hasUser.id, email: hasUser.email }, "jay_ambe", {
      expiresIn: "1h",
    });
  } catch (error) {
    return next(
      new HttpError("Something went wrong, Could not logged in user.", 500)
    );
  }

  res
    .json({ userId: hasUser.id, email: hasUser.email, token: token })
    .status(201);
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.signup = signup;
exports.login = login;
