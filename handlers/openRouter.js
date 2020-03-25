const express = require('express');
const router = express.Router();
const passport = require('passport');
const helper = require('./helpers.js');
const user = require('./usersRouter.js');
const path = require('path');

// Welcome Page
// router.get('/', helper.ensureAuthenticated, (req, resp) => {
//    //resp.render('home', {user: req.user});
//    if (process.env.NODE_ENV === 'production') {
//       //app.use(express.static(path.join(__dirname, "../frontend", "build")))
//       //app.use(express.static('../frontend/build'))
//          resp.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
//    }
//    else {
//       resp.redirect("http://localhost:3000")
//    }
// });

router.get('/main', helper.ensureAuthenticated, (req, resp) => {
   //resp.render('home', {user: req.user});
   if (process.env.NODE_ENV === 'production') {
      //app.use(express.static(path.join(__dirname, "../frontend", "build")))
      //app.use(express.static('../frontend/build'))
         resp.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
   }
   else {
      resp.redirect("http://localhost:3000")
   }
});

router.get('/login', (req, resp) => {
   resp.render('login', {message: req.flash('error')});
});

router.get('/logout', (req, resp) => {
   req.logout();
   req.flash('info', 'You were logged out');
   console.log('logging out');
   resp.render('login', { message: req.flash('info') });
});

router.post('/login', async (req, resp, next) => {
   // use passport authentication to see if valid login
   passport.authenticate('localLogin',
      {
         successRedirect: '/',
         failureRedirect: '/login',
         failureFlash: true
      })(req, resp, next);
});

module.exports = router;