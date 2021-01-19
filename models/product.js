const path = require('path');
const fs = require('fs');

const rootDir = require('../helper/path');

const myPath = path.join(
    rootDir, 
    'products_data', 
    'products.json'
);

const getMyPathFolderData = cb => {
    fs.readFile(myPath, (err, fileContent) => {
        if(err) {
            cb([]);
        }
        else
            cb(JSON.parse(fileContent));
    }) 
}

module.exports = class Product {

    constructor(id, title, imageURL, description, price){
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
        this.id = id;
    }

    save() {
        getMyPathFolderData(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(myPath, JSON.stringify(updatedProduct), (err) => {
                    console.log(err);
                });
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(myPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
            }  
        });
    }

    static fetchProducts(cb) {
        getMyPathFolderData(cb);
    }

    static findById(id, cb) {
        getMyPathFolderData(products => {
          const product = products.find(p => p.id === id);
          cb(product);
        });
      }
}