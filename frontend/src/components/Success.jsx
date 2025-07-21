 


// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { base64Decode } from "esewajs";
// import axios from "axios";

// const Success = () => {
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const token = queryParams.get("data");
//   const decoded = base64Decode(token);

//   const verifyPaymentAndUpdateStatus = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/payment-status", {
//         product_id: decoded.transaction_uuid,
//       });

//       if (response.status === 200) {
//         // Get pending order from localStorage
//         const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
//         if (orderData) {
//           await axios.post("http://localhost:5000/api/orders/esewa", orderData);
//           localStorage.removeItem("pendingOrder");
//         }

//         setIsSuccess(true);
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     verifyPaymentAndUpdateStatus();
//   }, []);

//   if (isLoading) return <p>Loading...</p>;

//   if (!isSuccess) {
//     return (
//       <div>
//         <h1>Oops! Something went wrong.</h1>
//         <button onClick={() => navigate("/")}>Go to Homepage</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Payment Successful!</h1>
//       <p>Your order has been placed and paid successfully.</p>
//       <button onClick={() => navigate("/orders")}>Go to Order Page</button>
//     </div>
//   );
// };

// export default Success;



import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  
  const verifyPaymentAndUpdateStatus = async () => {
    try {
      // 1. Decode the token
      const decoded = base64Decode(token);
      console.log("Decoded token:", decoded);

      // 2. Verify payment with eSewa
      const paymentResponse = await axios.post("http://localhost:5000/payment-status", {
        product_id: decoded.transaction_uuid,
      });
      console.log("Payment verification response:", paymentResponse.data);

      if (paymentResponse.status === 200) {
        // 3. Get pending order from localStorage
        const orderData = JSON.parse(localStorage.getItem("pendingOrder"));
        console.log("Order data from localStorage:", orderData);

        if (!orderData) {
          throw new Error("Order data not found in localStorage");
        }

        // 4. Create the order with payment status COMPLETE
        const orderResponse = await axios.post("http://localhost:5000/api/orders/esewa", {
          ...orderData,
          productId: decoded.transaction_uuid, // Add the transaction ID
          paymentStatus: "COMPLETE"
        });
        console.log("Order creation response:", orderResponse.data);

        localStorage.removeItem("pendingOrder");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error in payment verification:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Verifying your payment...</p>
        <p>Please wait while we process your order.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Processing Error</h1>
        <p className="mb-4 text-gray-700">{error}</p>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Check Your Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md text-center">
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">Payment Status Unknown</h1>
        <p className="mb-4">We couldn't verify your payment status.</p>
        <p className="mb-4">Please check your orders or contact support.</p>
        <button
          onClick={() => navigate("/orders")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Check Your Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="mb-4">Your order has been placed successfully.</p>
      <button
        onClick={() => navigate("/orders")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        View Your Orders
      </button>
    </div>
  );
};

export default Success;