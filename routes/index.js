const express=require('express');
const {ensureIsAuth}=require('../helpers/auth')
const Story=require('../models/Story')
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('index/welcome')
})

router.get('/dashboard',ensureIsAuth,(req,res)=>{
    Story.find({user:req.user._id}).lean()
    .then(stories=>{
        res.render('index/dashboard',{
            stories:stories
        })
    })

})

router.get('/about',(req,res)=>{
    res.render('index/about')

})


module.exports=router