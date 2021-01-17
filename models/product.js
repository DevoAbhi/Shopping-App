const path = require('path');
const fs = require('fs');

const rootDir = require('../helper/path');

module.exports = class Product {

    constructor(title){
        this.title = title;
    }

    save() {
        const myPath = path.join(
            rootDir, 
            'products_data', 
            'products.json'
        );

        fs.readFile(myPath, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(myPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchProducts(cb) {
        const myPath = path.join(
            rootDir, 
            'products_data', 
            'products.json'
        );
        fs.readFile(myPath, (err, fileContent) => {
            if(err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        }) 

        
    }
}