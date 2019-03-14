const fake = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("drivers")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("drivers").insert([
        {
          firstname: "Steph",
          lastname: "Curry",
          phone: "3235465879",
          vehicle_type: "motorcycle",
          location: `"21.2364, 21.8143"`,
          username: "splash_30",
          password: bcrypt.hashSync("password", 12),
          email: "gsw30@gsw.com",
          price: 120
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email(),
          price: fake.random.number(200)
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email(),
          price: fake.random.number(200)
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email(),
          price: fake.random.number(200)
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email(),
          price: fake.random.number(200)
        }
      ]);
    });
};
