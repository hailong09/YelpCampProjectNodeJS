const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');


// app.get('/fakeUser', async (req,res) => {
//     const user = new User({email: 'longg@gmail.com', username:'long'})
//     const newUser = await User.register(user, '123456');
//     res.send(newUser);
// })

router.route('/register')
    .get(users.renderRegister)
    .post( catchAsync(users.register))

router.route('/login')
    .get( users.renderLogin )
    .post(passport.authenticate('local', {failureRedirect: '/login',failureFlash: true }), users.login )

router.get('/logout', users.logout);

module.exports = router