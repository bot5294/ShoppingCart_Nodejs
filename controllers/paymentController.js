module.exports.profile = function(req,res){
    console.log(req.body);
    return res.status(200).json({message:'<h1>yes</h1>'});
}

module.exports.payments = function(req,res){
    return res.render('<h1>hi</h1>');
}