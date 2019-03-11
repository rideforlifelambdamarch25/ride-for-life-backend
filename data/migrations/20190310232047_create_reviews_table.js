exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", tbl => {
    tbl
      .increments("review_id")
      .notNullable()
      .primary();

    tbl.string("review_content", 255).notNullable();
    tbl.integer("rating").unsigned();

    tbl.integer("user_id").unsigned();
    tbl
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");

    tbl.integer("driver_id").unsigned();
    tbl
      .foreign("driver_id")
      .references("driver_id")
      .inTable("drivers")
      .onDelete("CASCADE");

    tbl.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
