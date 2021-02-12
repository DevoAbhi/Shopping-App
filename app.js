const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const controller404 = require('./controllers/404');
const mongoConnect = require('./helper/database').mongoConnect;
const User = require("./models/user")

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("6026f543223805d4d1b84fb3")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(controller404.get404);

mongoConnect(() => {
  app.listen(3000, ()=> {
    console.log("Server is running!")
  });
});
