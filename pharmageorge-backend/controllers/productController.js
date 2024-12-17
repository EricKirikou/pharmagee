const Product = require('../models/Product.');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, salePrice, imageUrl, category } = req.body;
    const newProduct = new Product({ name, description, price, salePrice, imageUrl, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
