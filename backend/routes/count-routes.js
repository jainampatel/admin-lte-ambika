const express = require("express");
const { check } = require("express-validator");

const countControllers = require("../controllers/count-controllers");

const router = express.Router();

router.get("/works", countControllers.getWorksCount);
router.get("/users", countControllers.getUsersCount);

module.exports = router;
