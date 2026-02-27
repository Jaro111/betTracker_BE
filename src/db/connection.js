const { Sequelize } = require("sequelize");

let sequelize;

// Leniwa inicjalizacja – połączenie tylko przy pierwszym użyciu
const getSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(process.env.URI, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: console.log, // włącz – zobaczysz zapytania w logach Vercel
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 20000,
      },
    });

    // Test połączenia – tylko raz, asynchronicznie
    sequelize
      .authenticate()
      .then(() => console.log("✅ Połączenie z bazą OK"))
      .catch((err) => console.error("❌ Błąd połączenia z bazą:", err));
  }
  return sequelize;
};

module.exports = getSequelize;
