const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const workSchema = new Schema({
  invoiceno: { type: Number, required: true, unique: true },
  customerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  carNo: { type: Number, required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, required: true },
  branch: { type: String, required: true },
});

workSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Work", workSchema);
