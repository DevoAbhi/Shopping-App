const path = require("path");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const controller404 = require("./controllers/404");
const User = require("./models/user");

const MONGODB_URI = "mongodb+srv://Abhinab:LmkMBWg7dUseDowc@cluster.e2ips.mongodb.net/shop";

const app = express();
const store_session = new MongoDBSession({
  uri: MONGODB_URI,
  collection: 'session'
})

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const Product = require("./models/product");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session(
    {
      secret: 'abhinab is awesome', 
      resave: false, 
      saveUninitialized: false,
      store: store_session
    })
)

// app.use((req, res, next) => {
//   User.findById("6033ceedb9af1b17dceeefa2")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(controller404.get404);

mongoose.connect(MONGODB_URI,
  { useUnifiedTopology: true }, { useNewUrlParser: true }
)
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Abhinab Roy',
        email: 'abhinabroy2001@gmail.com',
        cart: {
          items: []
        }
      })
      user.save();
    }
  })
  
  app.listen(3000, () => {
    console.log("Database Connected and Server running!")
  })
})
.catch(err => {
  console.log(err);
  console.log("Could not connect to the Database!")
})
