const express = require("express");
const { check } = require("express-validator");

const workControllers = require("../controllers/work-controllers");

const router = express.Router();

router.get("/", workControllers.getWorks);
router.get("/:wid", workControllers.getWorkById);

router.post(
  "/",
  [
    check("invoiceno").notEmpty().isNumeric(),
    check("customerName").notEmpty(),
    check("amount").notEmpty().isNumeric(),
    check("paymentType").notEmpty(),
    check("branch").notEmpty(),
  ],
  workControllers.createWork
);

router.patch(
  "/:wid",
  [
    check("invoiceno").notEmpty().isNumeric(),
    check("customerName").notEmpty(),
    check("date").notEmpty(),
    check("amount").notEmpty().isNumeric(),
    check("paymentType").notEmpty(),
    check("branch").notEmpty(),
  ],
  workControllers.updateWork
);

router.delete("/:wid", workControllers.deleteWork);

module.exports = router;
