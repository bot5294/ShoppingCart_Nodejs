const Item = require('../models/items');
const Cart = require('../models/cart');
const db = require('../config/mongoose');
const url = require('url');
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

module.exports.add2cart = function(req,res){
    const object = url.parse(req.url, true).query;
    const id=object.id;
    Item.findById({_id:id},function(err,result){
        if(err){
            console.log(`Error in fetching data from db findby id : ${err}`);
        }
        Cart.findById({_id:id},function(err,result){
            if(err){
                console.log(`Error in fetching cart item : ${err}`)
            }
            if(result){
                Cart.updateOne({_id:id},{$set:{count:result.count+1}},function(err,result){
                    if(err){
                        console.log(`Error in updating cart count : ${err}`)
                    }
                })
            }else{
                Cart.create({
                    _id:id,
                    count:1
                },function(err,result){
                    if(err){
                        console.log(`Error in inserting to cart : ${err}`)
                    }
                    
                })
            }
        })
    })
    return res.redirect('/')
}
module.exports.cart = function(req,res){
    Cart.find({},async function(err,result){
        if(err){
            console.log(`Error in fetching cart items @cart : ${err}`);
            return res.status(404).json('Cart Empty')
        }
        var itemArray= [];
        await result.forEach(cartItem => {
            Item.findById({_id:cartItem._id},{projection:{_id:0,desc:0}},function(err,item){
                if(err){
                    console.log(`Error in finding cart item info : ${err}`);
                }
                itemArray.push({
                    "name":item.name,
                    "quantity":cartItem.count,
                    "price":item.price
                })
                // console.log(itemArray); // working
            }) 
        })
        console.log(itemArray)
        
        return res.render('cart',{
            data:itemArray,
        });
    }
    )
}
