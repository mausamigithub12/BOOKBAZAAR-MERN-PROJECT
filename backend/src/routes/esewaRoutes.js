const express = require("express");
const router = express.Router();
const { initiatePayment, verifyPayment } = require("../controllers/esewaController");

router.post("/create-esewa-order", initiatePayment);
router.get("/verify", verifyPayment);

module.exports = router;
