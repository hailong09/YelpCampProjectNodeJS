const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const {Schema} = mongoose;
const Review = require('./review')

const campGroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }, 
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

//delele all reviews in when delete a campground middleware
campGroundSchema.post('findOneAndDelete', async function(doc){
    // console.log(doc);
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Campground", campGroundSchema);
