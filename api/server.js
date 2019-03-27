const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const helmet = require("helmet");

// Routers
const driversRouter = require("./Routes/driverRouter/driverRouter");
const usersRouter = require("./Routes/userRouter/userRouter");
const authRouter = require("./Routes/Auth/authRoutes");

const server = express();

server.use(helmet(), cors({ origin: false }), express.json());

// ROUTES
server.use("/api", authRouter);
server.use("/api/drivers", driversRouter);
server.use("/api/users", usersRouter);

server.get("/", async (req, res) => {
  res.status(200).json({
    api: "up"
  });
});

module.exports = server;
