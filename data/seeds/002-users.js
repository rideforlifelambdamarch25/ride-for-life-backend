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
          phone: fake.phone.phoneNumber(),
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`
        },
        {
          firstname: fake.name.firstName(),
          phone: fake.phone.phoneNumber(),
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`
        },
        {
          firstname: fake.name.firstName(),
          phone: fake.phone.phoneNumber(),
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
        },
        {
          firstname: fake.name.firstName(),
          phone: fake.phone.phoneNumber(),
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`
        },
        {
          firstname: fake.name.firstName(),   
          phone: fake.phone.phoneNumber(),          
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          
        },
        {
          firstname: fake.name.firstName(),          
          phone: fake.phone.phoneNumber(),
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          
        }
      ]);
    });
};
