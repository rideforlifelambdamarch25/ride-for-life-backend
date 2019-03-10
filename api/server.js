const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const configureRoutes = require("./config/routes.js");

const server = express();

server.use(helmet(), cors(), express.json());

// configureRoutes(server);

server.get("/", async (req, res) => {
  res.status(200).json({
    api: "up"
  });
});

module.exports = server;
