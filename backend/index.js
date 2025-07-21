


// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// // ✅ Connect to DB
// async function main() {
//   await mongoose.connect(process.env.DB_URL);
// }
// main()
//   .then(() => console.log("MongoDB connected successfully!"))
//   .catch((err) => console.log(err));

// // ✅ CORS middleware (must come before routes)
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );

// // ✅ Other middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Routes
// const esewaRoutes = require("./src/esewa/esewaRoutes.js");
// app.use("/api/payment", esewaRoutes);

// const bookRoutes = require("./src/books/book.route.js");
// app.use("/api/books", bookRoutes);

// const orderRoutes = require("./src/orders/order.route.js");
// app.use("/api/orders", orderRoutes);

// const userRoutes = require("./src/users/user.route.js");
// app.use("/api/auth", userRoutes);

// const adminRoutes = require("./src/stats/admin.stats.js");
// app.use("/api/admin", adminRoutes);

// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("Book Bazar server is live and running fine");
// });

// // ✅ Start server once (only one listen)
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const { EsewaInitiatePayment, paymentStatus } = require("./src/controller/esewa.controller.js");

// ✅ Connect to DB
async function main() {
  await mongoose.connect(process.env.DB_URL);
}
main()
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// ✅ CORS middleware (must come before routes)
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.post("/initiate-payment", EsewaInitiatePayment);
app.post("/payment-status", paymentStatus);



const bookRoutes = require("./src/books/book.route.js");
app.use("/api/books", bookRoutes);

const orderRoutes = require("./src/orders/order.route.js");
app.use("/api/orders", orderRoutes); // Make sure this includes eSewa verification

const userRoutes = require("./src/users/user.route.js");
app.use("/api/auth", userRoutes);

const adminRoutes = require("./src/stats/admin.stats.js");
app.use("/api/admin", adminRoutes);

// ✅ Error handling middleware (recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Book Bazar server is live and running fine");
});

// ✅ Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});