const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: {
      type: String,
      enum: [
        "Wall Clock",
        "Money Bank",
        "Car Stand ",
        " Wall Art Piece",
        "Key Holder Stand",
        "Wooden Hamper Box",
        "Gifting Box",
        "Night Lamps",
        "Wooden Hanging Lights",
        "Kapoor Dani",
        "Wooden Hanuman Chalisa",
        "Wooden Calendar",
        "Tea Coaster",
      ],
      required: true,
    },
    size: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
