// const express = require("express");
// const router = express.Router();
// const {
//   createProduct,
//   getProducts,
//   deleteProduct,
//   updateProduct,
// } = require("../controllers/productController");

// router.post("/", createProduct); // ➕ Add product
// router.get("/", getProducts); // 📦 Get all
// router.delete("/:id", deleteProduct); // 🗑️ Delete
// router.put("/:id", updateProduct); // ✏️ Update

// module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "crafting_products", // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);
// Protected routes
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
