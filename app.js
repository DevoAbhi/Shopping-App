const path = require("path");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const controller404 = require("./controllers/404");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6026f543223805d4d1b84fb3")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(controller404.get404);

mongoose.connect(
  "mongodb+srv://Abhinab:LmkMBWg7dUseDowc@cluster.e2ips.mongodb.net/shop?retryWrites=true&w=majority",
  { useUnifiedTopology: true }, { useNewUrlParser: true }
)
.then(result => {
  app.listen(3000, () => {
    console.log("Database Connected and Server running!")
  })
})
.catch(err => {
  console.log(err);
})
