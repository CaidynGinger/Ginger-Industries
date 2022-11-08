const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// routes
// app.use('/register', require('./routes/register'));




mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
