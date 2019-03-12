const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  addUser,
  findUserByQuery,
  removeUser
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
  const [id] = await db("users").insert(user, "id");
  return getUserById(id);
}

function updateUser(id, changes) {
  return db("users")
    .where("user_id", id)
    .update(changes);
}

function findUserByQuery(query) {
  return db("users")
    .where("username", query)
    .orWhere("phone", query)
    .orWhere("email", query)
    .first();
}

function removeUser(id) {
  return db("users")
    .where("user_id", id)
    .del();
}
