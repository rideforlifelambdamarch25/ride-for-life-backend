// Update with your config settings.

const localPGConnection = {
  host: "localhost",
  database: "rideforlife",
  user: "admin",
  password: "ride"
};

const prodDbConnection = process.env.DATABASE_URL || localPGConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/devDb.db3"
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
