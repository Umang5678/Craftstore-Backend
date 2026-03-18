const mongoose = require("mongoose");
const dns = require("dns");

// 🔥 ADD THIS (IMPORTANT)
dns.setServers(["1.1.1.1"]);

const connectDB = async () => {
  try {
    console.log("👉 MONGO_URI USED:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // 👈 forces IPv4 (VERY IMPORTANT)
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
