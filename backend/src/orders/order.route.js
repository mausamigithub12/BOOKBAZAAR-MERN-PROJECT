// const express = require('express');
// const { createAOrder, getOrderByEmail, completeEsewaOrder } = require('./order.controller');

// const router =  express.Router();

// // create order endpoint
// router.post("/", createAOrder);

// // get orders by user email 
// router.get("/email/:email", getOrderByEmail);

// router.post("/esewa-complete", completeEsewaOrder); // Add this new route


// module.exports = router;



const express = require("express");
const router = express.Router();
const { createAOrder, getOrderByEmail, completeEsewaOrder } = require("./order.controller");

router.post("/", createAOrder);
router.post("/esewa", completeEsewaOrder);
router.get("/email/:email", getOrderByEmail);

module.exports = router;
