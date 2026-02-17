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
      },
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
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// 📦 Get products (FAST: pagination + filter)
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const category = req.query.category;

    // 🔍 Filter
    let filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    // 📦 Fetch products
    const products = await Product.find(filter)
      .select("name price image category createdAt") // IMPORTANT
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔢 Count total
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
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
