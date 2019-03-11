const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const helmet = require("helmet");

const {
  restricted,
  verifyDriver,
  verifyUser
} = require("../middleware/authenticate");

// Routers
const driversRouter = require("./Routes/driverRouter/driverRouter");
const usersRouter = require("./Routes/userRouter/userRouter");
const authRouter = require("./Routes/Auth/authRoutes");

const server = express();

server.use(helmet(), cors(), express.json());

server.use("/api", authRouter);
server.use("/api/drivers", restricted, driversRouter);
server.use("/api/users", restricted, usersRouter);

server.get("/", async (req, res) => {
  res.status(200).json({
    api: "up"
  });
});

module.exports = server;
