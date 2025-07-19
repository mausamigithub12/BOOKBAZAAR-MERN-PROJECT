// const axios = require("axios");

// const MERCHANT_CODE = "EPAYTEST"; // Test Merchant ID
// const SUCCESS_URL = "http://localhost:5173/payment-success";
// const FAILURE_URL = "http://localhost:5173/payment-failure";

// exports.initiatePayment = (req, res) => {
//   const { amount, productId } = req.body;

//   const query = new URLSearchParams({
//     amt: amount,
//     psc: 0,
//     pdc: 0,
//     txAmt: 0,
//     tAmt: amount,
//     pid: productId,
//     scd: MERCHANT_CODE,
//     su: SUCCESS_URL,
//     fu: FAILURE_URL,
//   });

//   // Use official test payment URL
//   const redirectUrl = `https://uat.esewa.com.np/epay/main?${query.toString()}`;
//   res.json({ url: redirectUrl });
// };

// exports.verifyPayment = async (req, res) => {
//   const { amt, pid, rid, scd } = req.query;

//   try {
//     const result = await axios.post("https://uat.esewa.com.np/epay/verify", new URLSearchParams({
//       amt,
//       rid,
//       pid,
//       scd,
//     }));

//     if (result.data?.status === "Success") {
//       // TODO: Save order to DB if needed
//       return res.send("✅ Payment verified and successful.");
//     } else {
//       return res.send("❌ Payment verification failed.");
//     }
//   } catch (err) {
//     return res.send("❌ Payment verification error.");
//   }
// };



const axios = require("axios");
const qs = require("querystring");

// Test environment configuration
const TEST_CONFIG = {
  merchantCode: "EPAYTEST",
  paymentUrl: "https://uat.esewa.com.np/epay/main",
  verifyUrl: "https://uat.esewa.com.np/epay/transrec",
  successUrl: "http://localhost:5173/payment-success",
  failureUrl: "http://localhost:5173/payment-failure"
};

exports.initiatePayment = async (req, res) => {
  try {
    const { amount, productId } = req.body;
    
    // Validate input
    if (!amount || !productId) {
      return res.status(400).json({ error: "Amount and product ID are required" });
    }

    const params = {
      amt: amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: amount,
      pid: productId.substring(0, 20), // eSewa limits PID to 20 chars
      scd: TEST_CONFIG.merchantCode,
      su: TEST_CONFIG.successUrl,
      fu: TEST_CONFIG.failureUrl
    };

    const paymentUrl = `${TEST_CONFIG.paymentUrl}?${qs.stringify(params)}`;
    res.json({ url: paymentUrl });

  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { amt, pid, rid } = req.query;

    // Verify payment with eSewa
    const response = await axios.post(TEST_CONFIG.verifyUrl, qs.stringify({
      amt,
      rid,
      pid,
      scd: TEST_CONFIG.merchantCode
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    // eSewa returns XML response
    if (response.data.includes("<response>Success</response>")) {
      // Redirect to frontend success page which will then redirect to orders
      res.redirect(`${TEST_CONFIG.successUrl}?pid=${pid}&rid=${rid}`);
    } else {
      res.redirect(`${TEST_CONFIG.failureUrl}?error=verification_failed`);
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.redirect(`${TEST_CONFIG.failureUrl}?error=server_error`);
  }
};
