exports.up = function(knex, Promise) {
  return knex.schema.createTable("drivers", tbl => {
    tbl
      .increments("driver_id")
      .notNullable()
      .primary();

    tbl.string("firstname", 255).notNullable();

    tbl.string("lastname", 255).notNullable();

    tbl
      .string("username", 255)
      .notNullable()
      .unique();

    tbl.string("password", 255).notNullable();

    tbl
      .string("email", 255)
      .unique()
      .defaultTo(null);

    tbl
      .string("phone")
      .notNullable()
      .unique();

    tbl.string("vehicle_type", 80).notNullable();

    tbl.string("location", 255).defaultTo(null);

    tbl
      .integer("price")
      .unsigned()
      .defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("drivers");
};
