const { DataTypes } = require("sequelize");

const sequelize = require("../db/connection");

const Sport = sequelize.define(
  "Sport",
  {
    country: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    sport: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { timestamps: false },
);

module.exports = Sport;
