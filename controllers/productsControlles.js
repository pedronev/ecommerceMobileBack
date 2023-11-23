const Product = require('../models/Products');

module.exports = {
    createProduct: async(req,res) => {
        const newProduct = new Product(req.body);
        try {
            const productCount = await Product.countDocuments();
            if (productCount >= 20) {
                return res.status(400).json('Cannot create more than 20 products');
            }
            await newProduct.save();
            res.status(201).json('product created succesfully')
        } catch (error) {
            res.status(500).json('failed to create the product')
            console.log(error)
        }
    },

    getAllProducts: async(req,res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1})
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json('failed to get the products')
            console.log(error)
        }
    },

    getProduct: async(req,res) => {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json('failed to get the product')
        }
    },
    searchProduct: async(req,res) =>{
        try {
            const result = await Product.aggregate(
                [
  {
    $search: {
      index: "default",
      text: {
        query: req.params.key,
        path: {
          wildcard: "*"
        }
      }
    }
  }
]
            )
            console.log(result)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json('failed to get the products')
        }
    }
}