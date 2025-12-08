
import cors from 'cors'
import 'dotenv/config'
import { connectToDB } from './config/mongodb.js'
import connectToCloudinary from './config/cloudinary.js'
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import orderRoute from './routes/order.route.js'

// App Config  
import express from 'express'
const app = express()
const port = process.env.PORT || 4000
app.use(cors({
    origin:[process.env.ADMIN_URL ,"https://e-commerce-saxl.vercel.app"],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))
// Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// api endpoints 
app.get("/", (req, res) => {
  res.send("Backend is running...");
});
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)


connectToDB()
connectToCloudinary()
app.listen(port,()=>console.log('Server listing on PORT: '+ port))
