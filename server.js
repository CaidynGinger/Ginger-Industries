const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3500;
const path = require("path");

connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('images'))
app.use('/images', express.static('images'))

// routes
// app.use('/register', require('./routes/register'));

app.use(require("./routes/product.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/user.routes"));

mongoose.connection.once("open", () => {
  console.log("connected to MongoDb");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
