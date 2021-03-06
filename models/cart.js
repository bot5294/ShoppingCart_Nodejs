const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    count:{
        type:Number,
        required:true
    },
},{
    timestamps:true
});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;