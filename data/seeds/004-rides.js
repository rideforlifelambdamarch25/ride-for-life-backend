exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("rides")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("rides").insert([
        { user_id: "3", driver_id: 1 },
        { user_id: "2", driver_id: 5 },
        { user_id: "1", driver_id: 4 },
        { user_id: "4", driver_id: 2 },
        { user_id: "5", driver_id: 2 },
        { user_id: "6", driver_id: 3 },
        { user_id: "1", driver_id: 1 }
      ]);
    });
};
