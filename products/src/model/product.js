const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us the product name!']
    },
    category: {
        type: String,
        required: [true, 'Please tell us your Category!'],
    },
    cost: {
        type: Number,
        required: [true, 'Please tell us your Cost!'],
    },
    basePrice: {
        type: Number,
        required: [true, 'Please provide a Base Price']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    tag: {
        type: Number,
        required: [true, 'Please provide a tag']
    },
    imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;