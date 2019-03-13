exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl
      .increments("user_id")
      .notNullable()
      .primary();

    tbl.string("firstname", 255).notNullable();

    tbl
      .string("phone")
      .notNullable()
      .unique();

    tbl.string("location", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
