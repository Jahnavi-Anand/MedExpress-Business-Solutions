// models/CartItem.js

const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
