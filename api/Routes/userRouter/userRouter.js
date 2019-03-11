const express = require("express");

const router = express.Router();
const db = require("../../../models/users/usersModel");

router.get("/", async (req, res) => {
  try {
    const users = await db.getUsers();

    res.status(200).json(users);
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
      const user = await db.getUserById(id);
        
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({
        message: "A network error occurred"
      });
    }
  }
});

module.exports = router;
