const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');




// /admin/add-product => GET
router.get('/add-product', adminController.getAddProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProducts);

router.post('/delete-product/:productId');

module.exports = router;
