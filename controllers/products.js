const Product = require('../models/product');
const products = [];

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      addProductCSS: true,
      activeAddProduct: true
    });
}


exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {

    const products = Product.fetchProducts(products => {
      res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        addProductCSS: true
      });
    });
    
  }
