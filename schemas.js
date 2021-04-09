 const Joi = require('joi')
 // joi schema to valide data before attemp to save data to mongoose
 const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array()
})

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        body: Joi.string().required(),
    }).required()
})

module.exports.campgroundSchema = campgroundSchema
module.exports.reviewSchema = reviewSchema