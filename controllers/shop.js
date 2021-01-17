const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

    const products = Product.fetchProducts(products => {
      res.render('shop/products-list', {
        prods: products,
        pageTitle: 'Products',
        path: '/products',
      });
    });
    
  }

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-details', {
      product : product,
      pageTitle: product.title,
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  const products = Product.fetchProducts(products => {
    res.render('shop/index', {
      prods: products,
      path: '/',
      pageTitle: 'Your Shop',
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Cart',
    path: '/cart'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}