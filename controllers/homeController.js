const Item = require('../models/items');
const db = require('../config/mongoose');
module.exports.home = function(req,res){
    Item.find({},function(err, result){
        if(err){
            console.log("db error : "+err);
        }
        // console.log(result);
    return res.render('home',{
        title:"Shop",
        data:result
    })
    })
}

module.exports.cart = function(req,res){
    return res.render('cart');
}