import {User} from '../models/userModel.js'

// add to cart controller
export const addToCart = async (req,res) => {
    try {
        const {itemId,size} = req.body;
               const userId = req.userId;
       
        const userData = await User.findById(userId)
        if(!userData){
            return res.json({
                success:false,
                message:"User Not Found"
            })
        }

        let cartData =  userData.cartData || {}


        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            } else{
                cartData[itemId][size] = 1
            }
        } else{
          cartData[itemId]= {}
          cartData[itemId][size] = 1
        }
        await User.findByIdAndUpdate(userId,{cartData})
        return res.status(200).json({
            sucess:true,
            message:'Item add to Cart'
        })
    } catch (error) {
      
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
    
}

// update cartData controller
export const updateCart = async (req,res) => {
    try {
        const {itemId,size,quantity} = req.body;
               const userId = req.userId;

        const userData = await User.findById(userId)
       
        let cartData =  userData.cartData || {}
        

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId,{cartData})
return res.status(200).json({
    success:true,
    message:"Card Updated Successfully"
})
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
        
    }
}

// user cartData controller
export const userCart = async (req,res) => {
    try {
         
        const userId = req.userId;
   
        const userData = await User.findById(userId);
        let cartData = await userData.cartData;

        return res.status(200).json({
            success:true,
            cartData
        })

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}