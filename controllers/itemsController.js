const Item = require('../models/items')
const multer = require('multer');
const path = require('path')
// path.join(__dirname,'/uploads')
module.exports.add = function(req,res){
    return res.render('add_items')
}

module.exports.addItem = async function(req,res){
    

    // multer upload location
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
    const upload = multer({ storage: storage }).single('image')
    upload(req,res,(err)=>{
        if(err){console.log(`Error in multer upload: ${err}`)}
        else{
            console.log('hurray file uploaded successfully '+req.file.path)
        }
        // console.log(req.body)
        const item = new Item(
            {
                name: req.body.name,
                price: req.body.price,
                desc:req.body.desc,
                image:req.file.path
            }
            )
            try {
                const newItem = item.save(function(error,item){
                    if(error){
                        return res.render('../views/add_items',{message:error.message})
                    }
                    console.log('product added successfully')
                    return res.render('../views/add_items',{
                        message:'Product Added Successfulyy'
                    })
                });
                
            } catch (error) {
                res.status(400).json({message: error.message})
            }
            
    })
    // console.log(req.body);
  
    }