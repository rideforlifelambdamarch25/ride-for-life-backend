exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl
      .increments("user_id")
      .notNullable()
      .primary();

    tbl.string("firstname", 255).notNullable();

    tbl.string("lastname", 255).notNullable();

    tbl
      .string("username", 255)
      .notNullable()
      .unique();

    tbl.string("password", 255).notNullable();

    tbl.string("email", 255).unique();

    tbl.string("phone").unique();

    tbl.string("user_type", 80).notNullable();

    tbl.string("location", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
