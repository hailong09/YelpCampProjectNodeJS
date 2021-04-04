const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { route } = require('./campgrounds');
const passport = require('passport');

// app.get('/fakeUser', async (req,res) => {
//     const user = new User({email: 'longg@gmail.com', username:'long'})
//     const newUser = await User.register(user, '123456');
//     res.send(newUser);
// })
router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req,res) => {
    try{
        const {username, password, email} = req.body;
        const user =  new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err){return next(err);}
            req.flash('success' , 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds') 
        })
        
    }catch(e){
        req.flash('error', e.message);
         res.redirect('/register')
    }
    
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',  passport.authenticate('local', {
    failureRedirect: '/login',failureFlash: true }), (req, res) => {
        req.flash('success' , 'Welcome back!');
        const redirectUrl = req.session.returnTo || '/campgrounds'
        delete req.session.returnTo
        res.redirect(redirectUrl);

})

router.get('/logout',(req, res) => {
    req.logout();
    req.flash('success', "Loged You Out!")
    res.redirect('/campgrounds');
  });
module.exports = router