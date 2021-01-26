const getDb = require("../helper/database").getDb;
const path = require("path");
const fs = require("fs");
const Cart = require("./cart");

const rootDir = require("../helper/path");
const { json } = require("body-parser");

const myPath = path.join(rootDir, "products_data", "products.json");

const getMyPathFolderData = (cb) => {
  fs.readFile(myPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageURL, description, price) {
    this.title = title;
    this.imageURL = imageURL;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    db.collections("products").
    insertOne(this)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });
  }

  // save() {
  //     getMyPathFolderData(products => {
  //         if(this.id) {
  //             const existingProductIndex = products.findIndex(prod => prod.id === this.id);
  //             const updatedProduct = [...products];
  //             updatedProduct[existingProductIndex] = this;
  //             fs.writeFile(myPath, JSON.stringify(updatedProduct), (err) => {
  //                 console.log(err);
  //             });
  //         }
  //         else {
  //             this.id = Math.random().toString();
  //             products.push(this);
  //             fs.writeFile(myPath, JSON.stringify(products), (err) => {
  //             console.log(err);
  //         });
  //         }
  //     });
  // }

  static deleteById(id) {
    getMyPathFolderData((products) => {
      const product = products.find((prod) => prod.id === id);
      const productPrice = product.price;
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(myPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, productPrice);
        } else {
          console.log(err);
        }
      });
    });
  }

  static fetchProducts(cb) {
    getMyPathFolderData(cb);
  }

  static findById(id, cb) {
    getMyPathFolderData((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
