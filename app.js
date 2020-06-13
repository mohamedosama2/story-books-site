const mongoose=require('mongoose')
const express=require('express');
const authRoutes=require('./routes/auth');
const passport=require('passport');


require('./config/passport')(passport);

const app=express();

app.get('/',(req,res)=>{
    res.send('started')
})

app.use('/auth',authRoutes)

app.listen(process.env.PORT||5000)