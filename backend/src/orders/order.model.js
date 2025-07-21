// const mongoose =  require('mongoose');

// const orderSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email:{
//         type: String,
//         required: true,
//     },
//     address: {
//         city: {
//             type: String,
//             required: true,
//         },
//         country: String,
//         state: String,
//         zipcode: String,
//     },
//     phone: {
//         type: Number,
//         required: true,
//     },
//     productIds:[
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Book',
//             required: true,
//         }
//     ],

//     totalPrice: {
//         type: Number,
//         required: true,
//     }

    


// },



// {
//     timestamps: true,
// })

// const Order =  mongoose.model('Order', orderSchema);

// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    country: String,
    state: String,
    zipcode: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"], // Example statuses
    default: 'PENDING',
    required: true,
  },
  paymentMethod: {
    type: String,
    default: 'eSewa',
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

