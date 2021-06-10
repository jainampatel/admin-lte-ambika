const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Work = require("../schema/work-schema");

const getWorks = async (req, res, next) => {
  let responseData;
  try {
    responseData = await Work.find();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find works.", 500)
    );
  }
  if (!responseData) {
    const error = new HttpError("Could not find works.", 404);
    return next(error);
  }
  res
    .json({
      works: responseData.map((work) => work.toObject({ getters: true })),
    })
    .status(200);
};
const getWorkById = async (req, res, next) => {
  let responseData;
  const workId = req.params.wid;
  try {
    responseData = await Work.findById(workId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, could not find work for provided Id.",
        500
      )
    );
  }
  if (!responseData) {
    const error = new HttpError("Could not find work for provided Id.", 404);
    return next(error);
  }
  res
    .json({
      work: responseData.toObject({ getters: true }),
    })
    .status(200);
};

const createWork = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { invoiceno, customerName, date, carNo, amount, paymentType, branch } =
    req.body;
  const createdWork = new Work({
    invoiceno,
    customerName,
    date,
    carNo,
    amount,
    paymentType,
    branch,
  });
  try {
    await createdWork.save();
  } catch (err) {
    return next(new HttpError("Could not create work!", 500));
  }
  res.json({ work: createdWork }).status(201);
};

const updateWork = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const workId = req.params.wid;
  const { invoiceno, customerName, date, carNo, amount, paymentType, branch } =
    req.body;

  let work;

  try {
    work = await Work.findById(workId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not find update work.", 500)
    );
  }

  work.invoiceno = invoiceno;
  work.customerName = customerName;
  work.date = date;
  work.carNo = carNo;
  work.amount = amount;
  work.paymentType = paymentType;
  work.branch = branch;

  try {
    await work.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update work.", 500)
    );
  }

  res.json({ work: work.toObject({ getters: true }) }).status(200);
};

const deleteWork = async (req, res, next) => {
  const workId = req.params.wid;
  let work;

  try {
    work = await Work.findById(workId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete work.", 500)
    );
  }
  if (!work) {
    return next(new HttpError("Could not find work for provided id.", 404));
  }

  try {
    await work.deleteOne();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete work.", 500)
    );
  }
  res.json({ message: "Deleted work." }).status(200);
};

exports.getWorks = getWorks;
exports.getWorkById = getWorkById;
exports.createWork = createWork;
exports.updateWork = updateWork;
exports.deleteWork = deleteWork;
