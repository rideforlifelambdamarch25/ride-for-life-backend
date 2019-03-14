exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl
      .increments("user_id")
      .notNullable()
      .primary();

    tbl.string("firstname", 255).defaultTo(null);

    tbl
      .string("phone")
      .notNullable()
      .unique();

    tbl.string("location", 255).defaultTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
