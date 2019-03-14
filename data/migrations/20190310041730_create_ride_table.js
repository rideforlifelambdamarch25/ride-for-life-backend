exports.up = function(knex, Promise) {
  return knex.schema.createTable("rides", tbl => {
    tbl
      .increments("ride_id")
      .notNullable()
      .primary();

    tbl.integer("user_id").unsigned();
    tbl
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");

    tbl
      .integer("driver_id")
      .notNullable()
      .unsigned();
    tbl
      .foreign("driver_id")
      .references("driver_id")
      .inTable("drivers")
      .onDelete("CASCADE");

    tbl.string("start_location", 255).defaultTo(null);
    tbl.string("end_location", 255).defaultTo(null);

    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("rides");
};
