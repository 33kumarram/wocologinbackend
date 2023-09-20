const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const ConnectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes")


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

ConnectDB();
app.use(express.json()); // to accept json data
app.use(morgan("dev")); // to display hit url in terminal
app.use(cors(corsOptions)); // to accept request from origin specified in cor options

app.use("/users", userRoutes)
app.get("/", (req, res) => {
    res.send("welcome !!!");
  });

  app.use(notFound);

app.use(errorHandler);