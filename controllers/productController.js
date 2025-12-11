// const Product = require("../models/Product");

// // ➕ Add a new product
// exports.createProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.json({ message: "Product added successfully", product });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 📦 Get all products
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // 🗑️ Delete a product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const deleted = await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted", deleted });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // ✏️ Update a product
// exports.updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json({ message: "Product updated", updated });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Product = require("../models/Product");

// ➕ Add product
exports.createProduct = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : req.body.image;

    const product = new Product({
      ...req.body,
      size: req.body.size,
      image: imageUrl,
    });

    await product.save();
    res.json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.path;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.json({ message: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
