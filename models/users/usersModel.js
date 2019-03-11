const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  getUserById
};


function getUsers() {
    return db("users").select(
      "user_id",
      "firstname",
      "lastname",
      "username",
      "email",
      "phone",
      "user_type",
      "location"
    );
  }


  function getUserById(id) {
    return db('users')
    .select("user_id",
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "user_type",
    "location")
    .where('user_id', id)
    .first();
  }