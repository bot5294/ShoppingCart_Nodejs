require('dotenv').config()
// console.log(process.env)
const { urlencoded } = require('express');
const express = require('express');
const path = require('path')
const app = express();
const db = require('./config/mongoose')
const bodyParser = require('body-parser');

// const multer = require('multer')
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
// app.use('/icons',express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font/bootstrap-icons')))

const PORT = 8000;
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//  set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname))
app.use(express(urlencoded({extended:false})))
app.use(bodyParser.urlencoded({ extended: false })); 
// app.use(express.json());
app.use('/', require('./routes'));

app.listen(PORT,(err)=>{
    if(err){
        console.log(`Error in starting the server : ${err}`)
    }else{
        console.log(`Server is up & running at : http://localhost:${PORT} `)
    }
})