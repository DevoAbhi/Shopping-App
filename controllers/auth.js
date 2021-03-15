const bcrypt = require('bcryptjs')

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  User.findOne({ email: email })
    .then(user => {
      if(!user){
        console.log("No user found")
        return res.redirect('/login')
      }
      console.log('hello')
      console.log(user.password)
      bcrypt
      .compare(password, user.password)
      .then((isMatching) => {
        // if(err){
        //   console.log("bsdk idhar dekh le")
        //   console.log(err)
        //   return res.redirect('/login')
        // }
        if(isMatching){
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
          if(err){
            console.log(err);
          }
          console.log("Reached here")
          res.redirect('/')
        })
          
      }
      console.log("yaha hai problem")
      res.redirect('/login')
      
      })
      .catch(err => {
        if(err){
          console.log(err);
          res.redirect('/login');
        }
      })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({email: email}).then(userData => {
        if(userData){
            return res.redirect('/signup')
        }

        return bcrypt.hash(password,12).then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                cart: {items:[]}
            })
    
            return user.save()
        })
        .then(result => {
            res.redirect('/login');
        })
        
    })
    .catch(err => {
        if(err){
            console.log(err)
        }
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err){
        console.log(err);
    }
    res.redirect('/');
  });
};
