module.exports={
    ensureIsAuth:function(req,res,next){
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect('/')
}
}