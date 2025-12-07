import express from 'express'
import { adminAuth } from '../middleware/adminAuth.js';
import { allOrderAdmin, allOrderUser, orderStatus, placeOrder, placeOrderRazorpay, placeOrderStrip, verifyRazorpay, verifyStrip } from '../controllers/orderController.js';
import { userAuthorizes } from '../middleware/userAuth.js';
const orderRoute = express.Router()

// Admin Features

orderRoute.post("/list",adminAuth,allOrderAdmin)
orderRoute.post("/status",adminAuth,orderStatus)

// Payment Features 
orderRoute.post("/place",userAuthorizes,placeOrder)
orderRoute.post("/stripe",userAuthorizes,placeOrderStrip)
orderRoute.post("/razorpay",userAuthorizes,placeOrderRazorpay)

// User Features 
orderRoute.post("/userorders",userAuthorizes,allOrderUser)

// Verify stripe payment
orderRoute.post("/verifyStrip",userAuthorizes,verifyStrip)
orderRoute.post("/verifyRazorpay",userAuthorizes,verifyRazorpay)

export default orderRoute;