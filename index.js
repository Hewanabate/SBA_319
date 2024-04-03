require('dotenv').config();

// create a server
const express = require('express');
const app = express();

// connect mongoose to the database
const mongoose = require('mongoose');
const Product = require('./Models/productModel');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get all products
 app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});   

// get by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productid = await Product.findById(id);
    res.status(200).json(productid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

//Add data to the database
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update product
app.patch('/api/products', async (req, res) => {
  try {
    const { id } = req.params;
    const productid = await Product.findByIdAndUpdate(id, req.body);

    if (!Productroduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// connect to mongoose
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// listen to the port
app.listen(3000, () => console.log('Server Started'));


