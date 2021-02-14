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

    const updatedCart = {items: [{ ...product, quantity:1}]}
    const db = getDb()
    return db.collection('users')
    .updateOne({_id: new mongodb.ObjectID(this._id)}, { $set: {cart: updatedCart } }
    );

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
