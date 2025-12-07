import mongoose from 'mongoose'


export const connectToDB = async () => {
 await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connect to DB")).catch(()=>console.log("Not connect to DB"))
    
}