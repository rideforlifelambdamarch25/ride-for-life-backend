const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  updateUser
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
  return db("users")
    .select(
      "user_id",
      "firstname",
      "lastname",
      "username",
      "email",
      "phone",
      "user_type",
      "location"
    )
    .where("user_id", id)
    .first();
}

async function addUser(user) {
  const [id] = await db("drivers").insert(user);
  return getUserById(id);
}

function updateUser(id, changes) {
  return db("users")
    .where("user_id", id)
    .update(changes);
}
