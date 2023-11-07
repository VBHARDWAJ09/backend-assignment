const mongoose = require('mongoose');
const env = require('./envConfig');

const connect = async () => {
    try {
        console.log("trying to connect...");
        await mongoose.connect(env.database)
        console.log("Database connected");
    } catch (e) {
        console.log(e.message);
        process.exit;
    }
}

module.exports = connect