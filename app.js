const mongoose=require('mongoose')
const express=require('express');

const app=express();

app.get('/',(req,res)=>{
    res.send('started')
})

app.listen(process.env.PORT||5000)