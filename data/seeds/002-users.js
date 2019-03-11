const fake = require("faker");
const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "mother",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "mother",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "mother",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "caretaker",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "mother",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          user_type: "caretaker",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: bcrypt.hashSync("password", 12),
          email: fake.internet.email()
        }
      ]);
    });
};
