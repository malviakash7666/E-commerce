import mongoose from 'mongoose'


export const connectToDB = async () => {
 await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connect to DB")).catch((error)=>console.log(error,"Not connect to DB"))
    
}