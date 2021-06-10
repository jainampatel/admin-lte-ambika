const HttpError = require("../models/http-error");
const Work = require("../schema/work-schema");
const User = require("../schema/user-schema");

const getWorksCount = async (req, res, next) => {
  try {
    await Work.countDocuments({}, (err, count) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json({ worksCount: count }).status(200);
      }
    });
  } catch (err) {
    return next(new HttpError("Somenthing went wrong try again later", 500));
  }
};

const getUsersCount = async (req, res, next) => {
  try {
    User.countDocuments({}, (err, count) => {
      if (err) {
        throw new Error(err);
      } else {
        res.json({ usersCount: count }).status(200);
      }
    });
  } catch (err) {
    return next(new HttpError("Somenthing went wrong try again later", 500));
  }
};

exports.getWorksCount = getWorksCount;
exports.getUsersCount = getUsersCount;
