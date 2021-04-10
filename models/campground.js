const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const {Schema} = mongoose;
const Review = require('./review')

const imageSchema = new Schema({
    
        url: String,
        filename:String
    
})
imageSchema.virtual('thumbnail').get(function(){
     return this.url.replace('/upload','/upload/w_200')
})

const opts = {toJSON:{virtuals: true}};
const campGroundSchema = new Schema({
    title: String,
    image: [
        imageSchema
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
}, opts)
campGroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>`

});

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

