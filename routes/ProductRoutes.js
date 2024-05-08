const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

// Route for inserting a new product with image upload and categories
router.post('/product/insert', ProductController.insert,);

// Route for listing all products
router.get('/product/list', ProductController.list);

// Route for finding products by categories
// router.get('/findbycategories/:categories', ProductController.findByCategories);

module.exports = router;
