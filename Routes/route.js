const express = require('express');
const router = express.Router();
const Product = require('./Models/product.model');
//routes
const productsRoute = require('./Routes/route');
app.use('/api/products', productsRoute);


// get one data by id
router.get('/api/products/:id', getProduct ,(req, res) => {
    res.send(res.product.id)
  });
  
  //Add data to the database
  router.post('/api/products', async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // update product
  
  router.patch('/api/products/:name', getProduct, async(req, res) => {
    if(req.body.name != null){
    req.product.name = req.body.name
    }
    try {
      
      const updatedProduct = await res.product.save();
      res.json(updatedProduct)
    } catch (error) {
      res.status(400).json({message:error.message})
    }
  });
  
  //Delete
  router.delete('/api/products/:id',  getProduct, async (req, res) => {
    try {
      await res.product.remove()
      res.json({message: 'Deleted Product'})
      } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  async function getProduct(req, res, next){
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.product = Product
    next()
  }
  

module.exports = router;