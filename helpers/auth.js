module.exports={
    ensureIsAuth:function(req,res,next){
    if(req.isAuthenticated()){
        console.log('in authen')
       return next();
    }
    res.redirect('/')
    console.log('in authenaa')
}
}