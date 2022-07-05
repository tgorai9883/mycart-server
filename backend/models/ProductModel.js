const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},{ timestamps: true });

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type :String
    },
    image: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;