const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.URI, {
  dialect: "postgres",
  logging: false, // Set to true for debugging
});

sequelize.authenticate();
console.log("DataBase connection is working...");

module.exports = sequelize;
