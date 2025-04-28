require('dotenv').config();
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE
} = process.env;

module.exports = {
    development: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    },
    test: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    },
    production: {
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'postgres',
    },
  };