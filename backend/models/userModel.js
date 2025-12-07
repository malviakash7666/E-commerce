import mongoose, { mongo } from "mongoose";


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
    cardData:{
        type:Object,
        default:{}
    }
},{minimize:false})

export const User = mongoose.model('user',userModel)