const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const DriversDb = require("../../../models/drivers/driversModel");
const UsersDb = require("../../../models/users/usersModel");

const {
  generateToken,
  restricted
} = require("../../../middleware/authenticate.js");

// DRIVER REGISTRATION

router.post("/driver/register", async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    password,
    email,
    phone,
    vehicle_type,
    location,
    price
  } = req.body;

  const newDriver = req.body;
  const hash = bcrypt.hashSync(password, 12);
  newDriver.password = hash;

  if (
    !firstname ||
    !lastname ||
    !username ||
    !password ||
    !phone ||
    !vehicle_type
  ) {
    // All required information needed to create a new account
    res
      .status(400)
      .json({ message: "Please include all required information" });
  } else {
    try {
      const driver = await DriversDb.addDriver(newDriver);

      if (driver) {
        const token = generateToken(newDriver);

        res.status(201).json({
          message: "Registration Successful",
          driver,
          token
        });
      } else {
        res
          .status(400)
          .json({ message: "There was an error registering your account" });
      }
    } catch (error) {
      res.status(500).json({ message: "A network error occurred" });
    }
  }
});

// DRIVER LOG IN

router.post("/driver/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please include a username and password"
    });
  } else {
    try {
      const driver = await DriversDb.findDriverByUsername(username);
      if (driver && bcrypt.compareSync(password, driver.password)) {
        const token = generateToken(driver);
        res.status(200).json({
          message: `${username} logged in successfully`,
          token
        });
      } else {
        res.status(404).json({
          message: "The user with the specified username could not be found"
        });
      }
    } catch (error) {
      res.status(500).json({ message: "A network error occurred" });
    }
  }
});

module.exports = router;
