const db = require("../../data/dbConfig");

module.exports = {
  getDrivers,
  getDriverById,
  getDriverRideTotal,
  addDriver,
  removeDriver,
  updateDriver,
  findDriverByUsername,
  getDriverReviews,
  addDriverReview
};

function getDrivers() {
  return db("drivers").select(
    "driver_id",
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "vehicle_type",
    "location",
    "price"
  );
}

function getDriverById(id) {
  return db("drivers")
    .select(
      "driver_id",
      "firstname",
      "lastname",
      "username",
      "email",
      "phone",
      "vehicle_type",
      "location"
    )
    .where("driver_id", id)
    .first();
}

function getDriverRideTotal(id) {
  return db("drivers")
    .join("rides", "drivers.driver_id", "rides.driver_id")
    .count("drivers.driver_id as total_rides")
    .where("drivers.driver_id", id)
    .first();
}

function getDriverReviews(id) {
  return db("drivers")
    .select("reviews.user_id", "reviews.review_content", "reviews.rating")
    .join("reviews", "drivers.driver_id", "reviews.driver_id")
    .where("drivers.driver_id", id);
}

async function addDriver(driver) {
  const [id] = await db("drivers").insert(driver, "id");

  return getDriverById(id);
}

function removeDriver(id) {
  return db("drivers")
    .where("driver_id", id)
    .del();
}

function updateDriver(id, changes) {
  return db("drivers")
    .where("driver_id", id)
    .update(changes);
}

function findDriverByUsername(username) {
  return db("drivers")
    .where("username", username)
    .first();
}

function getReviewById(id) {
  return db("reviews")
    .where("review_id", id)
    .first();
}

async function addDriverReview(review) {
  const [id] = await db("reviews").insert(review, "id");
  return getReviewById(id);
}
