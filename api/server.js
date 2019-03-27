const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const helmet = require("helmet");

// Routers
const driversRouter = require("./Routes/driverRouter/driverRouter");
const usersRouter = require("./Routes/userRouter/userRouter");
const authRouter = require("./Routes/Auth/authRoutes");

const server = express();
const whitelist = ["http://localhost:3000"];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
server.use(helmet(), cors(corsOptionsDelegate), express.json());

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
