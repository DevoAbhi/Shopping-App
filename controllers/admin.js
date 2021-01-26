const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
}


exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageURL, description, price);
    product.save()
    .then(result => {
      console.log("Added Product!");
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
    
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const UpdatedTitle = req.body.title;
  const UpdatedImageURL = req.body.imageURL;
  const UpdatedPrice = req.body.price;
  const UpdatedDescription = req.body.description;
  const product = new Product(prodId, UpdatedTitle, UpdatedImageURL, UpdatedDescription, UpdatedPrice);

  product.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;  
  Product.deleteById(prodId);
  res.redirect('/admin/products');
  
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