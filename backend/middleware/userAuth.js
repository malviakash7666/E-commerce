import jwt from 'jsonwebtoken'
export const userAuthorizes = async (req,res,next) => {
    const token= req.header("token");
    
    
   try {
    
    const token_decoded =  jwt.verify(token,process.env.JWT_SCREATE)

    req.userId = token_decoded.id
    next()
    
    
   } catch (error) {
    console.log(error)
    return res.status(400).json({
        success:false,
        message:`error: ${error.message}`
    })
   }
    
}