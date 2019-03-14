exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("rides")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("rides").insert([
        { user_id: "2", driver_id: 1 },
        { user_id: "3", driver_id: 2 },
        { user_id: "5", driver_id: 3 }
      ]);
    });
};
