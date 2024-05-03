require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "db_juris_control",
      user: "postgres",
      password: "admin",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     connectionString: process.env.DB_URL,
  //     ssl: { rejectUnauthorized: false },
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: "knex_migrations",
  //     directory: `${__dirname}/src/database/migrations`,
  //   },
  // },
};