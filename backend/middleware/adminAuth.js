import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({
        suceess: false,
        message: "Not Authorized this resources Login again",
      });
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SCREATE);
    
    if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        suceess: false,
        message: "Not Authorized this resources Login again ",
      });
    }

    next();
  } catch (error) {
   
    return res.status(400).json({
      suceess: false,
      message: error.message || "Not Authorized this resources Login again",
    });
  }
};
