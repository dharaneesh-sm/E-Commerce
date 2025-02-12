const Product = require("../models/product");

//To Create an New Product
const addProduct = async (req,res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
    
        const newProduct = new Product({
          name,
          description,
          price,
          category,
        });
    
        await newProduct.save(); 
        res.status(201).send({ message: 'Product created successfully', product: newProduct });
      } 
      catch (err) {
        res.status(400).send({ error: err.message });
      }
}

//To Get an All Products
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  };

// Get a Single Product by ID
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  };

// Update an Existing Product
const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { 
        new: true,
        runValidators: true
      });
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } 
    catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete an Existing Product
const removeProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } 
    catch (error) {
      res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  };

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, removeProduct };