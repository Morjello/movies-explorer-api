require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("./middlewares/cors");
const router = require("./routes/index");

const { PORT = "3000", DB_ADDRESS = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const app = express();
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});
mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(helmet());

app.use("/api", router);

app.listen(PORT);
