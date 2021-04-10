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
    
   for(let i= 0; i< 200; i++){
       const rand1000 = Math.floor(Math.random() *1000);
       const price = Math.floor(Math.random() *20) +10;
       
       const camp = new Campground({
           author: '6067a5025b802834b458386e',
           location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           image: [
                {
                    url: 'https://res.cloudinary.com/yelpcampnodejs/image/upload/v1617921661/YelpCamp/udqasgmp8qaieetikhqn.jpg',
                    filename: 'YelpCamp/udqasgmp8qaieetikhqn'
                }
           ],
           description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molliti molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum!",
           price,
           geometry:  { "type" : "Point", "coordinates" : [cities[rand1000].longitude, cities[rand1000].latitude] },

       })
       await camp.save();
   }
   
}

seedDB().then(()=> {
    mongoose.connection.close();
});

