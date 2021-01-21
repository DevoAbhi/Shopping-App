const Product = require('../models/product');
const Cart = require('../models/cart');

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
  
  Cart.getCart(cart => {
    Product.fetchProducts(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }

      res.render('shop/cart', {
        pageTitle: ' Your Cart',
        path: '/cart',
        products: cartProducts
      })
    })
    
    
  })
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.deleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect('/cart');
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