const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require("../models/ProductModels");

// Create directories if they don't exist
const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Multer setup for single file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
})

const upload = multer({ storage: storage }).single('image');

// Controller function for inserting a new product with image and categories
exports.insert = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    const { title, description, price } = req.body;
    const imageUrl = req.body ? req.body.image : null;
    const categories = req.body.categories && typeof req.body.categories === 'string'
    ? req.body.categories.split(',').map((category) => category.trim())
    : [];
  
    if (!title || !description || !price || !imageUrl || categories.length === 0) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const product = new Product({
      title,
      description,
      price,
      image: imageUrl,
      categories
    });

    try {
      const savedProduct = await product.save();
      return res.status(201).json(savedProduct);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

// Controller function to list all products
exports.list = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to find products by categories
// exports.findByCategories = async (req, res) => {
//   const categories = req.params.categories;
//   try {
//     const products = await Product.find({ categories: categories });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
