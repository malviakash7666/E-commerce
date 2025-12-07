import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
       required:true   
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false}) // emty object {} bhi store hoga issai

export const User =mongoose.models.user ||  mongoose.model('user',userModel)