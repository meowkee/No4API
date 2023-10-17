const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    signUpDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lastSignInDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = { User };
