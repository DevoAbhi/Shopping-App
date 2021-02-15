const mongodb = require('mongodb');
const getDb = require('../helper/database').getDb;

class User{

  constructor(username, email, cart, userId) {
    this.name = username;
    this.email = email;
    this.cart = cart; //items []
    this._id = userId;
  }

  save(){
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  addToCart(product){

    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if(cartProductIndex >= 0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
      updatedCartItems.push({ productId: new mongodb.ObjectID(product._id) , quantity: newQuantity})
    }

    const updatedCart = {items: updatedCartItems}
    const db = getDb()
    return db.collection('users')
    .updateOne({_id: new mongodb.ObjectID(this._id)}, { $set: {cart: updatedCart } }
    );

  }

  getCart(){
    const db = getDb()
    const productIds = this.cart.items.map(i => {
      return i.productId;
    })
    return db.collection('products').find({_id : {$in : productIds}}).toArray()
    .then(products => {
      return products.map(prod => {
        return {
          ...prod,
          quantity : this.cart.items.find(i => {
            return i.productId.toString() === prod._id.toString()
          }).quantity
        }
      })
    })
  }

  deleteItemFromCart(prodId){
    const updatedCartItems = this.cart.items.filter(i => {
      return i.productId.toString() !== prodId.toString()
    })
    
    const db = getDb()
    return db.collection('users')
    .updateOne({_id: new mongodb.ObjectID(this._id)}, { $set: {cart: {items : updatedCartItems}  } }
    );
  }

  addOrders(){
    const db = getDb()
    return db.collection('orders').insertOne(this.cart).then(result => {
      this.cart = {items : []}
      return db.collection('users')
      .updateOne({_id: new mongodb.ObjectID(this._id)}, { $set: {cart: {items : []}  } }
    );
    })
  }

  static findById(userId){
    const db = getDb()
    return db.collection('users').findOne({_id: new mongodb.ObjectID(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err=> {
      console.log(err);
    })
  }
}

module.exports = User;
