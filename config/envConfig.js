require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    database: "mongodb+srv://bhardwajvishal2803:bhardwajvishal2803@cluster0.gihiuvo.mongodb.net/"
}