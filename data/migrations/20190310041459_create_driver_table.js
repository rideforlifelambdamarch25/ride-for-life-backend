exports.up = function(knex, Promise) {
  return knex.schema.createTable("drivers", tbl => {
    tbl.increments("driver_id");

    tbl.string("firstname", 255).notNullable();

    tbl.string("lastname", 255).notNullable();

    tbl
      .string("username", 255)
      .notNullable()
      .unique();

    tbl.string("password", 255).notNullable();

    tbl.string("email", 255).unique();

    tbl
      .integer("phone")
      .unsigned()
      .notNullable()
      .unique();

    tbl.string("vehicle_type", 80).notNullable();

    tbl.string("location", 255);

    tbl.integer("price").unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("drivers");
};
