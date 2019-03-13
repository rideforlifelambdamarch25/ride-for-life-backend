const express = require("express");
const router = express.Router();
const Driver = require("../../../models/drivers/driversModel.js");
const User = require("../../../models/users/usersModel.js");

const {
  restricted,
  verifyDriver,
  verifyUser
} = require("../../../middleware/authenticate");

// GET ENDPOINTS

router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.getDrivers();

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
      const driver = await Driver.getDriverById(id);
      const rideTotal = await Driver.getDriverRideTotal(id);
      const reviews = await Driver.getDriverReviews(id);

      if (!driver) {
        res
          .status(404)
          .json({ message: "The user with specified ID does not exist" });
      } else {
        res.status(200).json({ ...driver, ...rideTotal, reviews });
      }
    } catch (error) {
      res.status(500).json({
        message: "A network error occurred"
      });
    }
  }
});

// PUT
router.put("/:id", restricted, verifyDriver(), async (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  try {
    const driver = await Driver.getDriverById(id);
    if (!driver) {
      res.status(404).json({ message: "The specified driver does not exist" });
    } else {
      await Driver.updateDriver(id, changes);
      res.status(200).json({
        message: "Update successful"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "A network error ocurred" });
  }
});

// DELETE
router.delete("/:id", restricted, verifyDriver(), async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await Driver.getDriverById(id);

    if (!driver) {
      res
        .status(404)
        .json({ message: "The driver with the specified ID does not exist" });
    } else {
      await Driver.removeDriver(id);

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

// ADD DRIVER REVIEW

router.post("/:id/review", restricted, verifyUser(), async (req, res) => {
  const { id } = req.params;
  const { review_content, rating, user_id, driver_id } = req.body;
  console.log("WORKING");

  if (!review_content || !rating) {
    res.status(400).json({ message: "Please include a review and rating" });
  } else if (!user_id || !driver_id) {
    res.status(400).json({ message: "Please include user and driver ids" });
  } else {
    try {
      const driver = await Driver.getDriverById(id);

      if (!driver) {
        res.status(404).json({
          message: "The driver with the specified ID does not exist"
        });
      } else {
        const review = await Driver.addDriverReview(req.body);
        res.status(201).json({ message: "Review added successfully.", review });
      }
    } catch (error) {
      res.status(500).json({ message: "A network error occurred" });
    }
  }
});

// Add Ride

router.post("/create-ride", restricted, async (req, res) => {
  const { driver_id, user_id } = req.body;
  const newRide = req.body;

  if (!driver_id || !user_id) {
    res
      .status(400)
      .json({ message: "Driver ID and User ID required to create a ride" });
  } else {
    const user = await User.findUserByQuery(user_id);
    const driver = await Driver.getDriverById(driver_id);

    if (!driver) {
      res
        .status(404)
        .json({ message: "The driver with the specified ID does not exist" });
    } else if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      try {
        const ride = await Driver.addRide(newRide);

        res.status(201).json({ message: "Ride successfully created." });
      } catch (error) {
        res.status(500).json({ message: "A network error occurred." });
      }
    }
  }
});

module.exports = router;
