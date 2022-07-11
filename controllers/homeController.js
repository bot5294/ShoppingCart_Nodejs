const Item = require('../models/items');
const Cart = require('../models/cart');
const db = require('../config/mongoose');
const url = require('url');
const Promise = require('promise');
const { promiseImpl } = require('ejs');
const { resolve } = require('path');
// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
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

module.exports.checkout = function(req,res){
    let total = req.body.total;
    console.log(total);
    return res.render('checkout',{
        total:total
    })
}

// ****** using for in loop *****
// module.exports.cart = (req, res) => {
//         Cart.find({}, function (err, result) {
//             if (err) {
//                 console.log(`Error in fetching cart items @cart : ${err}`);
//                 return
//             }
//             var itemArray = [];
    
//             for (cartItem in result) {
//                 Item.findById({ _id: cartItem._id }, { projection: { _id: 0, desc: 0 } }, function (err, item) {
//                     if (err) {
//                         console.log(`Error in finding cart item info : ${err}`);
//                         return
//                     }
//                     itemArray.push({
//                         "name": item.name,
//                         "quantity": cartItem.count,
//                         "price": item.price
//                     })
//                     // console.log(itemArray); // working
//                 })
//             }
//         }).clone().catch(function(err){ console.log(err)}).then(
//             () => {
//                 console.log(itemArray)
//                 return res.render('cart', {
//                     data: itemArray,
//                 });
//             }
//         ).catch((erq) => { console.log(erq) } )
//     }





// ******* using for loop *****

// module.exports.cart = function(req,res){
//     Cart.find({},function(err,result){
//         if(err){
//             console.log(`Error in fetching cart items @cart : ${err}`);
//         }
//         var itemArray= [];
//        new Promise((resolve,reject) => { 
//             // result.forEach(async cartItem => {
//         for(let cartItem=0;cartItem<result.length;cartItem++){
//             Item.findById({_id:result[cartItem]._id},{projection:{_id:0,desc:0}},function(err,item){
//                 if(err){
//                     console.log(`Error in finding cart item info : ${err}`);
//                     reject();
//                 }
//                 itemArray.push({
//                     "name": item.name,
//                     "quantity": result[cartItem].count,
//                     "price": item.price
//                 })
//                 if(cartItem+1 == result.length){
//                     resolve();
//                 }
                
//                 // console.log(itemArray); // working
//             }) 
//         }
//         // resolve();
//     }).then(()=>{
//         console.log(itemArray);
//         return res.render('cart',{
//             data:itemArray,
//         });
//     })       
//     }
//     )
// }


// ****** using forEach loop *****
// module.exports.cart =  function(req,res){
//     Cart.find({}, async function(err,result){
//         if(err){
//             console.log(`Error in fetching cart items @cart : ${err}`);
//         }
//         var itemArray= [];
//             for(cartItem of result) {
//                  Item.findById({_id:cartItem._id},{projection:{_id:0,desc:0}},function(err,item){
//                     if(err){
//                         console.log(`Error in finding cart item info : ${err}`);
//                     }              
//                      itemArray.push({
//                             "name": item.name,
//                             "quantity": cartItem.count,
//                             "price": item.price
//                         })
//                     console.log(itemArray) 
//             }) 
//         } 
//             console.log(itemArray);
//             return res.render('cart',{
//                 data:itemArray,
//             });
       
        
//     })
        
      
// }



// ******* final working solution *******
module.exports.cart = function(req,res){
    Cart.find({},async function(err,result){
        if(err){
            console.log(`Error in fetching cart items @cart : ${err}`);
        }
        var itemArray= [];
        async function runLoop(){
            for(let cartItem of result){;
                async function getData (cartItem){
                  let value= await Item.findById({_id:cartItem._id},{projection:{_id:0,desc:0}});
                   let temp = ({
                    "name": value.name,
                    "quantity": cartItem.count,
                    "price": value.price
                   })
                itemArray.push(temp);
                }
               await getData(cartItem);
            }

        }
        await runLoop();
        return res.render('cart',{
            data:itemArray,
        });      
    })
}