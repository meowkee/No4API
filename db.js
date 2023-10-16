const {Sequelize} = require('sequelize');
const ph = require('pg');

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgresql',
        host: process.env.DB_HOST,
        dialectOptions: {ssl: true},
        dialectModule: pg
    }
);