const Blog = require("../models/Blog");
const slugify = require("slugify");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, tags, metaTitle, metaDescription } =
      req.body;

    const slug = slugify(title, { lower: true });

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      tags,
      metaTitle,
      metaDescription,
      coverImage: req.body.coverImage || "",
    });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BLOGS
const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

// GET BLOG BY SLUG
const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.json(blog);
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogBySlug,
  deleteBlog,
};
