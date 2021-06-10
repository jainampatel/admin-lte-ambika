const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.get("/", userControllers.getUsers);

router.get("/:uid", userControllers.getUserById);

router.post(
  "/",
  [
    check("name").notEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userControllers.createUser
);

router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userControllers.signup
);

router.post(
  "/login",
  [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userControllers.login
);

router.patch(
  "/:uid",
  [
    check("name").notEmpty(),
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userControllers.updateUser
);

router.delete("/:uid", userControllers.deleteUser);

module.exports = router;
