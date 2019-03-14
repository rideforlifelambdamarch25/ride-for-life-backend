exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl
      .increments("review_id")
      .notNullable()
      .primary();

    tbl.string("review_content", 255).defaultTo(null);
    tbl
      .integer("rating")
      .unsigned()
      .defaultTo(null);

    tbl.integer("user_id").unsigned();
    tbl
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");

    tbl
      .integer("driver_id")
      .unsigned()
      .notNullable();
    tbl
      .foreign("driver_id")
      .references("driver_id")
      .inTable("drivers")
      .onDelete("CASCADE");

    tbl
      .integer("ride_id")
      .unsigned()
      .notNullable();
    tbl
      .foreign("ride_id")
      .references("ride_id")
      .inTable("rides")
      .onDelete("CASCADE");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
