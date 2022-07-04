const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/E_com_app_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connectiong to MongoDB"));

db.once('open',function(){
    console.log('connected to Database :: MongoDB');
})

module.exports = db;