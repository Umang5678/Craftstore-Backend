const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST /api/orders - Create new order
router.post("/", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || items.length === 0 || !total)
      return res.status(400).json({ error: "Incomplete order data" });

    const order = new Order({ customer, items, total });
    await order.save();

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/orders - Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// PUT /api/orders/:id - Update order status
router.put("/:id", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ message: "Order status updated", updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

// GET /api/orders/user/:email - Get orders for a specific user
router.get("/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      "customer.email": req.params.email,
    }).sort({ createdAt: -1 }); // latest first
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
