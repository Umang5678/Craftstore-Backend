const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  deleteBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
