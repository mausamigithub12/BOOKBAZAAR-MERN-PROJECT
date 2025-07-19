const express = require('express');
const { createAOrder, getOrderByEmail, completeEsewaOrder } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

router.post("/esewa-complete", completeEsewaOrder); // Add this new route


module.exports = router;