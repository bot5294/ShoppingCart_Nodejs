// const express = require('express');
// const router = express.Router();
// const https = require('https')
require('dotenv').config();
const axios = require('axios');
// const { data } = require('jquery');
module.exports.profile = async function(req,res){
    const trnxId  = req.cookies['trnxId'];
    let data = {
        "language":"en",
        "comments":"",
        "create_from_id": trnxId
    }
    data = JSON.stringify(data);
    await axios.post('https://api.na.bambora.com/v1/profiles',
    data,
    {headers:{
        "Content-Type":"application/json",
        "Authorization":`${process.env.ProfilePasscode}`
    }}
    )
    .then(res => {
        console.log(`statusCode: ${res.status}`);
        console.log(res.data)
        token = res.data.token;
        console.log("********-*****-***-**--**--**-")        
        })
    .catch(error => {
        console.log('********------ Error -----*******')
        console.error(error);
        });
    res.clearCookie('trnxId',{httpOnly:true});
    return res.send("<h1>Done</h1>");
    // There is some bug in create profile via token
//     console.log(req.body)

//     var data ={
//         "number": "4030000010001234",
//         "expiry_month": "06",
//         "expiry_year": "23",
//         "cvd": "123"
//       }; 
//     let headers = {
//         "Content-Type": "application/json"
//     }
//     let cc = '';
//     let token = '';
//     await axios
//         .post('https://api.na.bambora.com/scripts/tokenization/tokens', 
//         data,
//         {headers:headers}
//     )
//     .then(res => {
//         console.log(`statusCode: ${res.status}`);
//         console.log(res)
//         token = res.data.token;
//         console.log("********-*****-***-**--**--**-")
        
//     })
//     .catch(error => {
//         console.log('********------ Error -----*******')
//         console.error(error);
//     });
//     console.log('****** token *****')
//     console.log(token);
//     // sending token 
//     async function createCC(){
//     let data = {
//         "name":`${req.body.card_name}`,
//         "code":`${token}`
//     }
//     data = JSON.stringify(data);
//     await axios
//     .post('https://api.na.bambora.com/v1/profiles', 
//     {token:data},
//     {headers:{
//         "Authorization":"Passcode MzAwMjEzMDI5OkY2Y0E2NEQ1NDNjQTREZmRCODgzQ2QyMzhGRDQ5RUQ2",
//         "Content-Type": "application/json"
//     }
// }
// )
// .then(res => {
//     console.log(`statusCode: ${res.status}`);
//     console.log(res.data)
//     console.log("********-*****-CUSTOMER CODE***-**--**--**-")
//     console.log(res.data.customer_code);
//     cc = res.data.customer_code;
    
// })
// .catch(error => {
//     console.error(error);
// });
//     }
//     await createCC();
//     console.log("cc code = : "+cc)
//     // await res.cookie("cc", `${cc}`, { httpOnly: true });
//     return res.redirect(307,`/v1/payments`);
}

module.exports.payments = async function(req,res){
    // const cc  = req.cookies['cc'];
    console.log('req body above 3333333')
       console.log(req.body)
    let data = {
        "amount":`${req.body.amt}`,
        "payment_method":"card",
        "card":{
          "name":`${req.body.card_name}`,
          "number":`${req.body.card_number}`,
          "expiry_month":`${req.body.card_exp_month}`,
          "expiry_year":`${req.body.card_exp_year}`,
          "cvd":`${req.body.card_cvv}`
        }
    }
    data = JSON.stringify(data);
    console.log('******** data *******')
    console.log(data)
    let trnxId = '';
    await axios
    .post('https://api.na.bambora.com/v1/payments',
    data,
    {
        headers:{
            "Authorization":`${process.env.MainPasscode}`,
            "Content-Type": "application/json"
        }
    }
    )
    .then(res => {
        console.log(`statusCode of payment : ${res.status}`);
        trnxId = res.id;
        console.log(res.data)
        
    })
    .catch(error => {
        console.log('******* Error at payment *******')
        console.error(error.response.data);
    });
    // console.log("inside payments : "+cc);
    // res.clearCookie('cc',{httpOnly:true});
    await res.cookie("trnxId", `${trnxId}`, { httpOnly: true })
    return res.redirect(307,`/v1/profile`);
}



