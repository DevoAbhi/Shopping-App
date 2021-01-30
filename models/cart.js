// const fs = require('fs');
// const path = require('path');
// const rootDir = require('../helper/path');

// const myPath = path.join(
//     rootDir, 
//     'products_data', 
//     'cart.json'
// );

// module.exports = class Cart {

//     static addProduct(id, productPrice) {
//         // Fetch the earlier stored cart
//         fs.readFile(myPath, (err, fileContent) => {
//             let cart = { products: [], totalPrice: 0}
//             if(!err) {
//                 cart = JSON.parse(fileContent);
//             }

//             // Analyze the cart to find existing product 
//             const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//             const existingProduct = cart.products[existingProductIndex];
//             let updatedProduct;
            
//             if(existingProduct) {
//                 updatedProduct = {...existingProduct};
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updatedProduct;
//             }
//             else {
//                 updatedProduct = {id : id, qty : 1};
//                 cart.products = [...cart.products, updatedProduct];
//             }

//             cart.totalPrice = cart.totalPrice + +productPrice;
//             fs.writeFile(myPath, JSON.stringify(cart), (err) => {
//                 if(err) {
//                     console.log(err);
//                 }
//             });
//         })   
//     }

//     static deleteProduct(id, productPrice) {
//         fs.readFile(myPath, (err, fileContent) => {
//             if(err) {
//                 return;
//             }
//             const updatedCart = { ...JSON.parse(fileContent) };
//             const product = updatedCart.products.find(prod => prod.id === id);
//             if(!product){
//                 return;
//             }
//             const productQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

//             fs.writeFile(myPath, JSON.stringify(updatedCart), (err) => {
//                 if(err) {
//                     console.log(err);
//                 }
//             });
//         })
//     }

//     static getCart(cb) {
//         fs.readFile(myPath, (err, fileContent) => {
//             const cart = JSON.parse(fileContent);
//             if(err) {
//                 console.log(err);
//                 cb(null);
//             }
//             else {
//                 cb(cart);
//             }
//         })
//     }
// }

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;

