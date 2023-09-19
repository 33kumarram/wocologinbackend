const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

var corsOptions = {
    // origin: "*",
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  };

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, (req, res) => {
  console.log(`app is listening at port ${PORT}`);
});

app.use(express.json()); // to accept json data
app.use(morgan("dev")); // to display hit url in terminal
app.use(cors(corsOptions)); // to accept request from origin specified in cor options

app.get("/", (req, res) => {
    res.send("welcome !!!");
  });