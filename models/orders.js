const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
        type:Number,
        required:true
    },
    trnxId:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }

},{
    timestamps:true
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;