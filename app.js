const path = require('path');
const mongoConnect = require('./helper/database').mongoConnect;

const express = require('express');
const bodyParser = require('body-parser');

const Controller404 = require('./controllers/404')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(Controller404.get404);

mongoConnect(() => {
    app.listen(3000, () => {
        console.log("Server has started!");
    });
})


