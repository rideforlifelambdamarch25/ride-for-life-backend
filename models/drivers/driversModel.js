const db = require("../../data/dbConfig");

module.exports = {
  getDrivers,
  getDriverById,
  getDriverRideTotal
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
  
    if (id) {
        return db('drivers')
        .join('rides', 'drivers.driver_id', 'rides.driver_id')
        .count('drivers.driver_id as total_rides')
        .where('drivers.driver_id', id)
        .first();
  } else {
    return db('drivers')
        .join('rides', 'drivers.driver_id', 'rides.driver_id')
        .select('drivers.driver_id').count('drivers.driver_id as total_rides')
        .first();
  }
}
