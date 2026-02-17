// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     price: { type: Number, required: true },
//     image: { type: String },
//     category: {
//       type: String,
//       enum: [
//         "Wall Clock",
//         "Money Bank",
//         "Car Stand",
//         "Wall Art Piece",
//         "Card Holder",
//         "Key Holder Stand",
//         "Wooden Hamper Box",
//         "Gifting Box",
//         "Night Lamps",
//         "Wooden Hanging Lights",
//         "Kapoor Dani",
//         "Wooden Hanuman Chalisa",
//         "Wooden Calendar",
//         "Tea Coaster",
//       ],
//       required: true,
//     },
//     size: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // 🔍 search speed
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
      index: true, // 🔍 sort/filter speed
    },

    image: {
      type: String,
    },

    category: {
      type: String,
      enum: [
        "Wall Clock",
        "Money Bank",
        "Car Stand",
        "Wall Art Piece",
        "Card Holder",
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
      index: true, // 🚀 MOST IMPORTANT
    },

    size: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

// ⚡ Compound index for product listing
productSchema.index({ category: 1, createdAt: -1 });

// ⚡ Text search (optional)
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Product", productSchema);
