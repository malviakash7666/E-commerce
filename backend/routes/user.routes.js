import express from 'express'
import { adminLogin, userLogin, userRegister } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post("/register",userRegister)
userRoute.post("/login",userLogin)
userRoute.post("/admin",adminLogin)

export default userRoute;