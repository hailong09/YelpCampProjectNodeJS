const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const {descriptors, places} = require("./seedHelpers");

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

//get notified if we connect succesffulu or if a connection error occurs
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Database Connected");
});

const sample = (arr) => {
   return arr[Math.floor(Math.random() * arr.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
   for(let i= 0; i< 50; i++){
       const rand1000 = Math.floor(Math.random() *1000);
       const price = Math.floor(Math.random() *20) +10;
       const camp = new Campground({

           location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           image: 'https://source.unsplash.com/collection/483251',
           description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molliti molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum!",
           price

       })
       await camp.save();
   }
   
}

seedDB().then(()=> {
    mongoose.connection.close();
});
