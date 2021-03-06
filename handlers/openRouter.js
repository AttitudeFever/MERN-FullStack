const express = require('express');
const router = express.Router();
const passport = require('passport');
const helper = require('./helpers.js');
const user = require('./usersRouter.js');
const path = require('path');

// home Page
router.get('/', helper.ensureAuthenticated, (req, resp) => {
   //resp.render('home', {user: req.user});
   if (process.env.NODE_ENV === 'production') {
         resp.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'))
   }
   else {
      resp.redirect("http://localhost:3000")
   }
});

//login route when error
router.get('/login', (req, resp) => {
   resp.render('login', {message: req.flash('error')});
});

//logout route
router.get('/logout', (req, resp) => {
   req.logout();
   req.flash('info', 'You were logged out');
   console.log('logging out');
   resp.render('login', { message: req.flash('info') });
});

//login route normal
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