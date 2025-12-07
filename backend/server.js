import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectToDB } from './config/mongodb.js'
import connectToCloudinary from './config/cloudinary.js'
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.route.js'

// App Config  
const app = express()
const port = process.env.PORT || 4000
app.use(cors({
    origin:[process.env.ADMIN_URL],
    methods:['POST','GET','PUT','DELETE']
}))
// Middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// api endpoints 
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)


connectToCloudinary()
connectToDB()
app.listen(port,()=>console.log('Server listing on PORT: '+port))