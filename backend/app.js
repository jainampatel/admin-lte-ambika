const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const HttpError = require("./models/http-error");
const userRoutes = require("./routes/user-routes");
const workRoutes = require("./routes/work-routes");
const countRoutes = require("./routes/count-routes");

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/api/user", userRoutes);

app.use("/api/work", workRoutes);

app.use("/api/count", countRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find the route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occur." });
});

mongoose
  .connect(
    "mongodb+srv://jainam:jainam123@cluster0.renza.mongodb.net/ambikaDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(app.listen(5000))
  .catch(() => {
    new HttpError("Connecting to database failed!");
  });
