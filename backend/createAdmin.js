require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/users/user.model");

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to MongoDB");

  const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
  if (existingAdmin) {
    console.log("Admin already exists.");
    return mongoose.disconnect();
  }

  const newAdmin = new User({
    email: "admin@gmail.com",
    password: "1234abc", // This will be hashed via pre-save hook
    role: "admin"
  });

  await newAdmin.save();
  console.log(" Admin user created successfully");

  mongoose.disconnect();
}

main().catch((err) => {
  console.error(" Error creating admin:", err);
  mongoose.disconnect();
});
