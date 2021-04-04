module.exports.isLoggedIn = (req, res, next) => {
    // console.log("Waht req user", req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl    //store the url they are requesting!
        req.flash('error', 'you must be signed in');
        return res.redirect('/login')
    }
    next();
}