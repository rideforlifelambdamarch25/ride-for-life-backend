const fake = require('faker');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drivers').del()
    .then(function () {
      // Inserts seed entries
      return knex('drivers').insert([
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: fake.internet.password(),
          email: fake.internet.email(),
          price: fake.random.number(200),
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: fake.internet.password(),
          email: fake.internet.email(),
          price: fake.random.number(200),
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: fake.internet.password(),
          email: fake.internet.email(),
          price: fake.random.number(200),
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: fake.internet.password(),
          email: fake.internet.email(),
          price: fake.random.number(200),
        },
        {
          firstname: fake.name.firstName(),
          lastname: fake.name.lastName(),
          phone: fake.phone.phoneNumber(),
          vehicle_type: "motorcycle",
          location: `${fake.address.latitude()}, ${fake.address.longitude()}`,
          username: fake.internet.userName(),
          password: fake.internet.password(),
          email: fake.internet.email(),
          price: fake.random.number(200),
        },
        
      ]);
    });
};
