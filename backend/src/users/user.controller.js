// // // const User = require("./user.model");
// // // const Order = require("../orders/order.model");

// // // const getAllUsers = async (req, res) => {
// // //   try {
// // //     // 1. Get all unique emails from non-deleted orders
// // //     const orders = await Order.find().select("email"); // email = user email
// // //     const userEmails = [...new Set(orders.map(order => order.email))];

// // //     // 2. Find users with those emails who are not admins
// // //     const users = await User.find(
// // //       {
// // //         email: { $in: userEmails },
// // //         isAdmin: false,
// // //       },
// // //       { password: 0 } // exclude password field
// // //     );

// // //     res.status(200).json(users);
// // //   } catch (error) {
// // //     console.error("Error fetching ordered users", error);
// // //     res.status(500).json({ message: "Failed to fetch users" });
// // //   }
// // // };

// // // module.exports = { getAllUsers };  yo chai nayabanako ho admin dashboard ko lagi


// // const User = require("./user.model");
// // const Order = require("../orders/order.model");

// // const getAllUsers = async (req, res) => {
// //   try {
// //     // Get all unique emails from orders
// //     const orders = await Order.find().select("email");
// //     const userEmails = [...new Set(orders.map(order => order.email))];

// //     // Find users with those emails
// //     const users = await User.find(
// //       { email: { $in: userEmails } },
// //       { password: 0 } // exclude password
// //     ).lean();

// //     // Enrich with order data
// //     const usersWithOrders = await Promise.all(users.map(async (user) => {
// //       const orders = await Order.find({ email: user.email })
// //         .select("paymentStatus totalPrice createdAt")
// //         .sort({ createdAt: -1 });
      
// //       return {
// //         ...user,
// //         totalOrders: orders.length,
// //         totalSpent: orders.reduce((sum, order) => sum + order.totalPrice, 0),
// //         lastOrder: orders[0]?.createdAt || null
// //       };
// //     }));

// //     res.status(200).json(usersWithOrders);
// //   } catch (error) {
// //     console.error("Error fetching ordered users", error);
// //     res.status(500).json({ message: "Failed to fetch users" });
// //   }
// // };

// // // const deleteUser = async (req, res) => {
// // //   try {
// // //     const userId = req.params.id;
    
// // //     // Check if user has pending orders
// // //     const pendingOrders = await Order.find({ 
// // //       email: req.user.email, 
// // //       paymentStatus: "PENDING" 
// // //     });
    
// // //     if (pendingOrders.length > 0) {
// // //       return res.status(400).json({ 
// // //         message: "Cannot delete user with pending orders" 
// // //       });
// // //     }

// // //     await User.findByIdAndDelete(userId);
// // //     res.status(200).json({ message: "User deleted successfully" });
// // //   } catch (error) {
// // //     console.error("Error deleting user", error);
// // //     res.status(500).json({ message: "Failed to delete user" });
// // //   }
// // // };



// // const deleteUser = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.id);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Check if user has pending orders
// //     const pendingOrders = await Order.find({ 
// //       email: user.email,
// //       paymentStatus: "PENDING" 
// //     });
    
// //     if (pendingOrders.length > 0) {
// //       return res.status(400).json({ 
// //         message: "Cannot delete user with pending orders" 
// //       });
// //     }

// //     // Perform hard delete (or soft delete if you prefer)
// //     await User.findByIdAndDelete(req.params.id);
    
// //     res.status(200).json({ 
// //       message: "User deleted successfully",
// //       deletedUserId: req.params.id // Return the deleted ID
// //     });
// //   } catch (error) {
// //     res.status(500).json({ 
// //       message: "Failed to delete user",
// //       error: error.message 
// //     });
// //   }
// // };

// // module.exports = { getAllUsers, deleteUser };



// const admin = require('../../firebaseAdmin');
// const Order = require('../orders/order.model');

// // Fetch all users who have placed orders (from Firebase Auth)
// const getAllUsers = async (req, res) => {
//   try {
//     const emailList = await Order.distinct('email');
    
//     const users = await Promise.all(emailList.map(async email => {
//       try {
//         const userRecord = await admin.auth().getUserByEmail(email);

//         // Fetch user order stats
//         const orders = await Order.find({ email }).sort({ createdAt: -1 });
//         const totalOrders = orders.length;
//         const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
//         const lastOrder = orders[0]?.createdAt || null;

//         return {
//           uid: userRecord.uid,
//           email: userRecord.email,
//           totalOrders,
//           totalSpent,
//           lastOrder,
//         };
//       } catch {
//         return null;
//       }
//     }));

//     res.status(200).json(users.filter(Boolean));
//   } catch (err) {
//     console.error("Error fetching users", err);
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// };

// // Delete Firebase user by UID if they have no pending orders
// const deleteUser = async (req, res) => {
//   try {
//     const { uid } = req.params;

//     // Get Firebase user record
//     const userRecord = await admin.auth().getUser(uid);
//     const email = userRecord.email;

//     // Check for pending orders
//     const pendingOrders = await Order.find({ email, paymentStatus: 'PENDING' });
//     if (pendingOrders.length > 0) {
//       return res.status(400).json({ message: 'Cannot delete user with pending orders' });
//     }

//     // Delete Firebase user
//     await admin.auth().deleteUser(uid);

//     res.status(200).json({ message: 'Firebase user deleted successfully', uid });
//   } catch (error) {
//     console.error("Error deleting Firebase user", error);
//     res.status(500).json({ message: 'Failed to delete Firebase user', error: error.message });
//   }
// };

// module.exports = { getAllUsers, deleteUser };




const admin = require('../../firebaseAdmin'); // Firebase Admin SDK

// 🚀 DELETE Firebase Auth User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user is an admin in MongoDB
    const User = require('./user.model');
    const adminUser = await User.findOne({ firebaseUid: id });
    if (adminUser) {
      return res.status(403).json({ message: "Cannot delete admin user from Firebase" });
    }

    // Delete user from Firebase Auth
    await admin.auth().deleteUser(id);

    res.status(200).json({ message: 'User successfully deleted from Firebase Auth' });
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(userRecord => ({
      uid: userRecord.uid,
      email: userRecord.email,
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
