const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router()

const db = require('../../../models/drivers/driversModel');


router.get('/', async (req, res) => {

    try {
        const drivers = await db.getDrivers();

        res.status(200).json(drivers)


    } catch (error) {
        res.status(500).json({
            message: "A network error occurred"
        })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).json({
        message: "Please include a valid id"
      });
    } else {
      try {
        const driver = await db.getDriverById(id);
        const rideTotal = await db.getDriverRideTotal(id)
        if (!driver) {
          res
            .status(404)
            .json({ message: "The user with specified ID does not exist" });
        } else {
          res.status(200).json({...driver, ...rideTotal});
        }
      } catch (error) {
        res.status(500).json({
          message: "A network error occurred"
        });
      }
    }
  });


  router.get("/:id/rides", async (req, res) => {
    const { id } = req.params;
  
    
     try {
        const rides = await db.getDriverRideTotal(id);

        res.status(200).json(rides)

     } catch (error) {
        res.status(500).json({
            message: "A network error occurred"
          });
     }


  });






module.exports = router
