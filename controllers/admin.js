const Product = require('../models/product');
const products = [];

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
    });
}


exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, description, price);
    product.save();
    res.redirect('/');
}

exports.getEditProducts = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    res.render('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode
  });
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchProducts(products => {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
        });
      });
}