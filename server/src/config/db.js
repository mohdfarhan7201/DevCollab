const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");
        console.log(`Host: ${connection.connection.host}`);

    } catch (error) {

        console.error("Database Connection Failed");

        console.log(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;