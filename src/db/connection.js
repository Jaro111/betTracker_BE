const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.URI, {
  dialect: "postgres",
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // kluczowe dla Supabase certs
    },
  },
  logging: console.log, // włącz, zobaczysz dokładne zapytania i błędy
  pool: {
    max: 5, // małe wartości na shared pooler
    min: 0,
    acquire: 30000,
    idle: 20000, // dłuższy idle pomaga przy "terminated unexpectedly"
  },
});

sequelize.authenticate();
console.log("DataBase connection is working...");

module.exports = sequelize;
