// Update with your config settings.
require("dotenv").config();
const pg = require("pg");

pg.defaults.ssl = true;

const localPGConnection = {
  host: "localhost",
  database: "db",
  user: "admin",
  password: "ride"
};

const prodDbConnection = process.env.DATABASE_URL || localPGConnection;

module.exports = {
  development: {
    client: "pg",
    connection: prodDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/testingDb.db3"
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
