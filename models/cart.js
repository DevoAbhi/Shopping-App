const fs = require('fs');
const path = require('path');
const rootDir = require('../helper/path');

const myPath = path.join(
    rootDir, 
    'products_data', 
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        // Fetch the earlier stored cart
        fs.readFile(myPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0}
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart to find existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(myPath, JSON.stringify(cart), (err) => {
                if(err) {
                    console.log(err);
                }
            });
        })   
    }
}