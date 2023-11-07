require('dotenv').config()
const constants = require('./const')

module.exports = {
    PORT: constants.PORT,
    JWT_SECRET: constants.JWT_SECRET,
    database: constants.db_url
}