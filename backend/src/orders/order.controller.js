
// const Order = require("./order.model");

// const createAOrder = async (req, res) => {
//   try {
//     const newOrder =  await Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// const getOrderByEmail = async (req, res) => {
//   try {
//     const {email} = req.params;
//     const orders = await Order.find({email}).sort({createdAt: -1});
//     if(!orders) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders", error);
//     res.status(500).json({ message: "Failed to fetch order" });
//   }
// }

// // Add this new function for eSewa payment success
// const completeEsewaOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
//     const newOrder = new Order(orderData);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     console.error("Error completing eSewa order", error);
//     res.status(500).json({ message: "Failed to complete order" });
//   }
// };
// //

// module.exports = {
//   createAOrder,
//   getOrderByEmail,  completeEsewaOrder

// };


const Order = require("./order.model");
const Transaction = require("../model/Transation.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const completeEsewaOrder = async (req, res) => {
  try {
    // Check if transaction exists and is complete
    const transaction = await Transaction.findOne({ 
      product_id: req.body.productId || req.body.productIds[0] 
    });
    
    if (!transaction || transaction.status !== "COMPLETE") {
      return res.status(400).json({ message: "Payment not verified" });
    }

    // Create order with COMPLETE status
    const newOrder = new Order({
      ...req.body,
      paymentStatus: "COMPLETE",
      paymentMethod: "eSewa"
    });
    
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email })
      .sort({ createdAt: -1 })
      .populate("productIds");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAOrder,
  completeEsewaOrder,
  getOrderByEmail,
};