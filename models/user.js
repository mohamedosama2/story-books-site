const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    googleID:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    image:{
        type:String
    }
});
module.exports=mongoose.model('users',userSchema)