const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const db = require("../../../models/drivers/driversModel");
const {
  generateToken,
  restricted
} = require("../.../../../../middleware/authenticate");

// REGISTER DRIVER

router.post("/register", async (req, res) => {
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
      const driver = await db.addDriver(newDriver);

      if (driver) {
        const token = generateToken(newDriver);
        console.log(token);
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

// GET ENDPOINTS

router.get("/", async (req, res) => {
  try {
    const drivers = await db.getDrivers();

    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({
      message: "A network error occurred"
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({
      message: "Please include a valid id"
    });
  } else {
    try {
      const driver = await db.getDriverById(id);
      const rideTotal = await db.getDriverRideTotal(id);

      // TODO: RETRIEVE REVIEWS and add to response

      if (!driver) {
        res
          .status(404)
          .json({ message: "The user with specified ID does not exist" });
      } else {
        res.status(200).json({ ...driver, ...rideTotal });
      }
    } catch (error) {
      res.status(500).json({
        message: "A network error occurred"
      });
    }
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await db.getDriverById(id);

    if (!driver) {
      res
        .status(404)
        .json({ message: "The driver with the specified ID does not exist" });
    } else {
      await db.removeDriver(id);

      return res
        .status(200)
        .json({ message: "Driver account removed successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "A network error occurred"
    });
  }
});

module.exports = router;
