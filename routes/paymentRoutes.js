const express = require("express");
const router = express.Router();
const razorpayInstance = require("../config/razorpay");

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

module.exports = router;
