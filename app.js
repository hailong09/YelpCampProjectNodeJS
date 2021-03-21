const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

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
//Home page
app.get("/", (req,res) =>{
    res.render("home");
})

//Show All campgrounds page
app.get("/campgrounds", async (req,res) =>{
    const campgrounds = await Campground.find({});
    res.render('campground/index', {campgrounds})
})

app.post("/campgrounds", async (req, res)=>{
   const campground = new Campground(req.body.campground);
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`);
})

//make new campground page
app.get("/campgrounds/new", (req,res) => {
    res.render("campground/new");
})

//show Single campground page
app.get("/campgrounds/:id", async (req,res) =>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campground/show", {campground})
})

//edit campground page
app.get('/campgrounds/:id/edit', async (req, res) =>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campground/edit", {campground});

})

app.put("/campgrounds/:id", async (req, res)=>{
    const {id} = req.params;
    
    const campgroundEditted = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new:true,useFindAndModify:false});
    res.redirect(`/campgrounds/${campgroundEditted._id}`);
})

app.delete('/campgrounds/:id', async (req, res) =>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
})


const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Serving on port ${PORT}`);
})
