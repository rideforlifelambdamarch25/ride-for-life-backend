const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


// Routers
const driversRouter = require('./Routes/driverRouter/driverRouter')
const usersRouter = require('./Routes/userRouter/userRouter')

const server = express();

server.use(helmet(), cors(), express.json());

server.use('/api/drivers', driversRouter);
server.use('/api/users', usersRouter)

server.get("/", async (req, res) => {
  res.status(200).json({
    api: "up"
  });
});

module.exports = server;
