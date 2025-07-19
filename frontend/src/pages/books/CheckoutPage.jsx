// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContext";

// function CheckoutPage() {
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const totalPrice = cartItems
//     .reduce((acc, item) => acc + item.newPrice, 0)
//     .toFixed(2);

// //  (this is just for manual process to understand) const currentUser = true; // tODO : grt user from authorizes state

// const {currentUser}=useAuth()
// const {
//     register,handleSubmit, watch, formState: { errors }, } = useForm();
//   const onSubmit = (data) => {
//     const newOrder = {
//       name: data.name,
//       email: currentUser?.email,
//       address: {
//         city: data.city,
//         country: data.country,
//         state: data.state,
//         zipcode: data.zipcode,
//       },
//       phone: data.phone,
//       productIds: cartItems.map((item) => item?._id),
//       totalPrice: totalPrice,
//     };
//     console.log(newOrder)
//   };

//   const [isChecked, setIsChecked] = useState(false);

//   return (
//     <section>
//       <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//         <div className="container max-w-screen-lg mx-auto">
//           <div>
//             <div>
//               <h2 className="font-semibold text-xl text-gray-600 mb-2">
//                 Cash On Delevary
//               </h2>
//               <p className="text-gray-500 mb-2">${totalPrice}</p>
//               <p className="text-gray-500 mb-6">
//                 Items:{cartItems.length > 0 ? cartItems.length : 0}{" "}
//               </p>
//             </div>

//             <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
//               >
//                 <div className="text-gray-600">
//                   <p className="font-medium text-lg">Personal Details</p>
//                   <p>Please fill out all the fields.</p>
//                 </div>

//                 <div className="lg:col-span-2">
//                   <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
//                     <div className="md:col-span-5">
//                       <label htmlFor="full_name">Full Name</label>
//                       <input
//                          {...register("name", { required: true })}
//                         type="text"
//                         name="name"
//                         id="name"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     <div className="md:col-span-5">
//                       <label html="email">Email Address</label>
//                       <input
//                         type="text"
//                         name="email"
//                         id="email"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                         disabled
//                         defaultValue={currentUser?.email}
//                         placeholder="email@domain.com"
//                       />
//                     </div>
//                     <div className="md:col-span-5">
//                       <label html="phone">Phone Number</label>
//                       <input
//                         {...register("phone", { required: true })}
//                         type="number"
//                         name="phone"
//                         id="phone"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                         placeholder="+123 456 7890"
//                       />
//                     </div>

//                     <div className="md:col-span-3">
//                       <label htmlFor="address">Address / Street</label>
//                       <input
//                        {...register("address", { required: true })}
//                         type="text"
//                         name="address"
//                         id="address"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                         placeholder=""
//                       />
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="city">City</label>
//                       <input
//                          {...register("city", { required: true })}
//                         type="text"
//                         name="city"
//                         id="city"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                         placeholder=""
//                       />
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="country">Country / region</label>
//                       <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                         <input
//                              {...register("country", { required: true })}
//                           name="country"
//                           id="country"
//                           placeholder="Country"
//                           className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
//                         />
//                         <button
//                           tabIndex="-1"
//                           className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600"
//                         >
//                           <svg
//                             className="w-4 h-4 mx-2 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                         </button>
//                         <button
//                           tabIndex="-1"
//                           className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
//                         >
//                           <svg
//                             className="w-4 h-4 mx-2 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <polyline points="18 15 12 9 6 15"></polyline>
//                           </svg>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="md:col-span-2">
//                       <label htmlFor="state">State / province</label>
//                       <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
//                         <input
//                          {...register("state", { required: true })}
//                           name="state"
//                           id="state"
//                           placeholder="State"
//                           className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
//                         />
//                         <button className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
//                           <svg
//                             className="w-4 h-4 mx-2 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                         </button>
//                         <button
//                           tabIndex="-1"
//                           className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600"
//                         >
//                           <svg
//                             className="w-4 h-4 mx-2 fill-current"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <polyline points="18 15 12 9 6 15"></polyline>
//                           </svg>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="md:col-span-1">
//                       <label htmlFor="zipcode">Zipcode</label>
//                       <input
//                         {...register("zipcode", { required: true })}
//                         type="text"
//                         name="zipcode"
//                         id="zipcode"
//                         className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                         placeholder=""
//                       />
//                     </div>

//                     <div className="md:col-span-5 mt-3">
//                       <div className="inline-flex items-center">
//                         <input
//                            onChange={(e) => setIsChecked(e.target.checked)}
//                           type="checkbox"
//                           name="billing_same"
//                           id="billing_same"
//                           className="form-checkbox"
//                         />
//                         <label htmlFor="billing_same" className="ml-2 ">
//                           I am aggree to the{" "}
//                           <Link className="underline underline-offset-2 text-blue-600">
//                             Terms & Conditions
//                           </Link>{" "}
//                           and{" "}
//                           <Link className="underline underline-offset-2 text-blue-600">
//                             Shoping Policy.
//                           </Link>
//                         </label>
//                       </div>
//                     </div>

//                     <div className="md:col-span-5 text-right">
//                       <div className="inline-flex items-end">
//                         <button
//                           disabled={!isChecked}
//                           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                         >
//                           Place an Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CheckoutPage;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import Swal from "sweetalert2";
// import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
// import axios from "axios";

// const CheckoutPage = () => {
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const totalPrice = cartItems
//     .reduce((acc, item) => acc + item.newPrice, 0)
//     .toFixed(2);
//   const { currentUser } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [createOrder, { isLoading }] = useCreateOrderMutation();
//   const navigate = useNavigate();
//   const [isChecked, setIsChecked] = useState(false);

//   const onSubmit = async (data) => {
//     const newOrder = {
//       name: data.name,
//       email: currentUser?.email,
//       address: {
//         city: data.city,
//         country: data.country,
//         state: data.state,
//         zipcode: data.zipcode,
//       },
//       phone: data.phone,
//       productIds: cartItems.map((item) => item?._id),
//       totalPrice: totalPrice,
//     };

//     try {
//       await createOrder(newOrder).unwrap();
//       Swal.fire({
//         title: "Confirmed Order",
//         text: "Your order placed successfully!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, It's Okay!",
//       });
//       navigate("/orders");
//     } catch (error) {
//       console.error("Error place an order", error);
//       alert("Failed to place an order");
//     }
//   };

//   const handleEsewaPayment = async (data) => {
//     const order = {
//       amount: totalPrice,
//       productId: "bookbazaar-" + Date.now(), // unique ID
//     };

//     try {
//       const res = await axios.post("http://localhost:5000/api/payment/create-esewa-order", order);
//       if (res.data?.url) {
//         window.location.href = res.data.url;
//       } else {
//         alert("Failed to generate eSewa payment link");
//       }
//     } catch (err) {
//       console.error("Esewa Payment Error", err);
//     }
//   };

//   if (isLoading) return <div>Loading....</div>;

//   return (
//     <section>
//       <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
//         <div className="container max-w-screen-lg mx-auto">
//           <div>
//             <h2 className="font-semibold text-xl text-gray-600 mb-2">
//               Checkout Page
//             </h2>
//             <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
//             <p className="text-gray-500 mb-6">
//               Items: {cartItems.length > 0 ? cartItems.length : 0}
//             </p>

//             <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
//               <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
//               >
//                 <div className="text-gray-600">
//                   <p className="font-medium text-lg">Personal Details</p>
//                   <p>Please fill out all the fields.</p>
//                 </div>

//                 <div className="lg:col-span-2">
//                   <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
//                     {/* Full Name */}
//                     <div className="md:col-span-5">
//                       <label htmlFor="full_name">Full Name</label>
//                       <input
//                         {...register("name", { required: true })}
//                         type="text"
//                         name="name"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div className="md:col-span-5">
//                       <label>Email Address</label>
//                       <input
//                         type="text"
//                         name="email"
//                         disabled
//                         defaultValue={currentUser?.email}
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div className="md:col-span-5">
//                       <label>Phone Number</label>
//                       <input
//                         {...register("phone", { required: true })}
//                         type="number"
//                         name="phone"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Address */}
//                     <div className="md:col-span-3">
//                       <label>Address / Street</label>
//                       <input
//                         {...register("address", { required: true })}
//                         type="text"
//                         name="address"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* City */}
//                     <div className="md:col-span-2">
//                       <label>City</label>
//                       <input
//                         {...register("city", { required: true })}
//                         type="text"
//                         name="city"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Country */}
//                     <div className="md:col-span-2">
//                       <label>Country / Region</label>
//                       <input
//                         {...register("country", { required: true })}
//                         type="text"
//                         name="country"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* State */}
//                     <div className="md:col-span-2">
//                       <label>State / Province</label>
//                       <input
//                         {...register("state", { required: true })}
//                         type="text"
//                         name="state"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Zipcode */}
//                     <div className="md:col-span-1">
//                       <label>Zipcode</label>
//                       <input
//                         {...register("zipcode", { required: true })}
//                         type="text"
//                         name="zipcode"
//                         className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
//                       />
//                     </div>

//                     {/* Checkbox */}
//                     <div className="md:col-span-5 mt-3">
//                       <div className="inline-flex items-center">
//                         <input
//                           onChange={(e) => setIsChecked(e.target.checked)}
//                           type="checkbox"
//                           className="form-checkbox"
//                         />
//                         <label className="ml-2">
//                           I agree to the{" "}
//                           <Link className="underline text-blue-600">
//                             Terms & Conditions
//                           </Link>{" "}
//                           and{" "}
//                           <Link className="underline text-blue-600">
//                             Shopping Policy
//                           </Link>
//                         </label>
//                       </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="md:col-span-5 flex justify-end space-x-4">
//                       <button
//                         disabled={!isChecked}
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Cash on Delivery
//                       </button>

//                       <button
//                         type="button"
//                         disabled={!isChecked}
//                         onClick={handleSubmit(handleEsewaPayment)}
//                         className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Pay with eSewa
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CheckoutPage;chatg


// this is the  code by deep.......

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import axios from "axios";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();

  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const prepareOrderData = () => {
    const formData = getValues();
    return {
      name: formData.name,
      email: currentUser?.email,
      address: {
        city: formData.city,
        country: formData.country,
        state: formData.state,
        zipcode: formData.zipcode,
      },
      phone: formData.phone,
      productIds: cartItems.map((item) => item?._id),
      totalPrice: totalPrice,
      paymentMethod: "eSewa",
      paymentStatus: "pending"
    };
  };

  const handleCashOnDelivery = async (data) => {
    try {
      const orderData = prepareOrderData();
      orderData.paymentMethod = "Cash on Delivery";
      orderData.paymentStatus = "pending";
      
      await createOrder(orderData).unwrap();
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully!",
        icon: "success"
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order", error);
      Swal.fire({
        title: "Error",
        text: "Failed to place order",
        icon: "error"
      });
    }
  };

  const handleEsewaPayment = async (data) => {
    setIsProcessingPayment(true);
    try {
      const orderData = prepareOrderData();
      
      // First create the order in "pending" state
      const orderResponse = await createOrder({
        ...orderData,
        paymentMethod: "eSewa",
        paymentStatus: "pending"
      }).unwrap();

      // Then initiate eSewa payment
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payment/create-esewa-order",
        {
          amount: totalPrice,
          productId: `order-${orderResponse._id}` // Use order ID in product ID
        }
      );

      if (paymentResponse.data?.url) {
        window.location.href = paymentResponse.data.url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error("Esewa Payment Error", error);
      Swal.fire({
        title: "Payment Error",
        text: "Failed to initiate eSewa payment",
        icon: "error"
      });
      setIsProcessingPayment(false);
    }
  };

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 mb-2">
              Checkout Page
            </h2>
            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
            <p className="text-gray-500 mb-6">
              Items: {cartItems.length > 0 ? cartItems.length : 0}
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <form
                onSubmit={handleSubmit(handleCashOnDelivery)}
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
              >
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    {/* Full Name */}
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Email */}
                    <div className="md:col-span-5">
                      <label>Email Address</label>
                      <input
                        type="text"
                        name="email"
                        disabled
                        defaultValue={currentUser?.email}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-5">
                      <label>Phone Number</label>
                      <input
                        {...register("phone", { required: true })}
                        type="number"
                        name="phone"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.phone && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-3">
                      <label>Address / Street</label>
                      <input
                        {...register("address", { required: true })}
                        type="text"
                        name="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.address && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* City */}
                    <div className="md:col-span-2">
                      <label>City</label>
                      <input
                        {...register("city", { required: true })}
                        type="text"
                        name="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.city && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Country */}
                    <div className="md:col-span-2">
                      <label>Country / Region</label>
                      <input
                        {...register("country", { required: true })}
                        type="text"
                        name="country"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.country && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* State */}
                    <div className="md:col-span-2">
                      <label>State / Province</label>
                      <input
                        {...register("state", { required: true })}
                        type="text"
                        name="state"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.state && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Zipcode */}
                    <div className="md:col-span-1">
                      <label>Zipcode</label>
                      <input
                        {...register("zipcode", { required: true })}
                        type="text"
                        name="zipcode"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.zipcode && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Checkbox */}
                    <div className="md:col-span-5 mt-3">
                      <div className="inline-flex items-center">
                        <input
                          onChange={(e) => setIsChecked(e.target.checked)}
                          type="checkbox"
                          className="form-checkbox"
                        />
                        <label className="ml-2">
                          I agree to the{" "}
                          <Link to="#" className="underline text-blue-600">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="#" className="underline text-blue-600">
                            Shopping Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-5 flex justify-end space-x-4">
                      <button
                        disabled={!isChecked || isProcessingPayment}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                      >
                        {isProcessingPayment ? "Processing..." : "Cash on Delivery"}
                      </button>

                      <button
                        type="button"
                        disabled={!isChecked || isProcessingPayment}
                        onClick={handleSubmit(handleEsewaPayment)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                      >
                        {isProcessingPayment ? "Redirecting to eSewa..." : "Pay with eSewa"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;