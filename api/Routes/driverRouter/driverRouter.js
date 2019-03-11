const express = require("express");
const router = express.Router();
const db = require("../../../models/drivers/driversModel");

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

// PUT
router.put("/:id", async (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const driver = await db.getDriverById(id);
    if (!driver) {
      res.status(404).json({ message: "The specified driver does not exist" });
    } else {
      await db.updateDriver(id, changes);
      res.status(200).json({
        message: "Update successful"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "A network error ocurred" });
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
