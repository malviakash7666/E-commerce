import express from 'express'
import { addToCart, updateCart, userCart } from '../controllers/cartControllers.js'
const cartRouter = express.Router()
import {userAuthorizes} from '../middleware/userAuth.js'
cartRouter.post('/add', userAuthorizes,addToCart)
cartRouter.post('/update',userAuthorizes,updateCart)
cartRouter.get('/get',userAuthorizes,userCart)

export default cartRouter