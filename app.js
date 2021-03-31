const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const session = require('express-session');
// const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/yelpCamp', {useNewUrlParser: true, 
useUnifiedTopology: true, useCreateIndex:true,useFindAndModify: false});

//get notified if we connect succesffulu or if a connection error occurs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database Connected");
});


//set up view engine ejs 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate)
//Allow shoing req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//methodoveride middleware
app.use(methodOverride("_method"));

//join validate function
// app.use((req, res, next) => {
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })
app.get('/', (req, res) => {
    res.render('home')
});

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)




app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Serving on port ${PORT}`);
})

