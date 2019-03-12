const db = require("../../data/dbConfig");

module.exports = {
  getUsers,
  findUserByQuery,
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

function findUserByQuery(query) {
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
    .where("user_id", query)
    .orWhere("username", query)
    .orWhere("phone", query)
    .orWhere("email", query)
    .first();
}

async function addUser(user) {
  const [id] = await db("users").insert(user, "id");
  return findUserByQuery(id);
}

function updateUser(id, changes) {
  return db("users")
    .where("user_id", id)
    .update(changes);
}

function removeUser(id) {
  return db("users")
    .where("user_id", id)
    .del();
}
