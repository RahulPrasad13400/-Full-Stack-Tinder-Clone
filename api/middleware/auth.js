import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // FOR GETTING A TOKEN THAT IS NAMED JWT (JWT ENNA PERE ANE LOGIN AND SIGNUP IN KODUTHEKENATH)
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const currentUser = await User.findById(decoded.id);

    req.user = currentUser;
    next();

  } catch (error) {
    console.log(error);
    if(error instanceof jwt.JsonWebTokenError){
        return res.status(401).json({
            success : false,
            message : "Not authorized"
        })
    } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });  
    }
  }
};
