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

router.post("/create-ride", async (req, res) => {
  const {
    driver_id,
    user_phone,
    start_location,
    end_location,
    firstname
  } = req.body;

  if (!driver_id || !user_phone) {
    return res.status(400).json({
      message: "Driver ID and User phone number required to create a ride"
    });
  }

  const user = await User.findUserByQuery(user_phone);
  const driver = await Driver.getDriverById(driver_id);

  console.log("USER", user);
  console.log("DRIVER", driver);

  // Check if a driver exists
  if (!driver) {
    res
      .status(404)
      .json({ message: "The driver with the specified ID does not exist" });
  }

  if (!user) {
    // If there is no user, create one for the ride

    try {
      const newUser = {
        phone: user_phone,
        location: !start_location ? null : start_location,
        firstname: !firstname ? null : firstname
      };
      console.log("NEW USER 1", newUser);

      await User.addUser(newUser);
      const rider = await User.findUserByQuery(user_phone);

      console.log("NEW USER 2", newUser);
      console.log("RIDER", rider);
      // pulling data from the new us er to create a new ride
      const newRide = {
        user_id: rider.user_id,
        driver_id: driver.driver_id,
        start_location: !rider.location ? null : rider.location,
        end_location: !end_location ? null : end_location
      };

      console.log("NEW RIDE", newRide);

      const ride = await Driver.addRide(newRide);

      res.status(201).json({ message: "Ride successfully created.", ride });
    } catch (error) {
      res.status(500).json({ message: "A network error occurred." });
    } // End of Try/Catch
  } else {
    // If the user exists create new ride
    // Start location should be set to the users current location
    // Or the location they specify

    try {
      const newRide = {
        user_id: user.user_id,
        driver_id: driver.driver_id,
        start_location: !start_location ? null : start_location,
        end_location: !end_location ? null : end_location
      };

      const ride = await Driver.addRide(newRide);

      res.status(201).json({ message: "Ride successfully created.", ride });
    } catch (error) {
      res.status(500).json({ message: "A network error occurred." });
    }
  }
});

module.exports = router;
