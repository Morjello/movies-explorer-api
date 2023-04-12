const { config } = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const limiter = require("./middlewares/rateLimiter");
const cors = require("./middlewares/cors");
const router = require("./routes/index");

const {
  PORT = "3000",
  NODE_ENV = config.NODE_ENV,
  DB_ADDRESS = config.DB_ADDRESS,
} = process.env;

const app = express();

mongoose.connect(
  NODE_ENV === "production" ? DB_ADDRESS : "mongodb://0.0.0.0:27017/bitfilmsdb",
  {
    useNewUrlParser: true,
  }
);
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet());
app.use(limiter);

app.use("/api", router);

app.listen(PORT);
