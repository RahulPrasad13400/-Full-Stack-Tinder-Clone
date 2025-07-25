import User from "../models/User.js";
import jwt from 'jsonwebtoken'

const signToken = async (id) => {
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '7d'})
}

export const login = async (req, res) => { 
  const { email, password } = req.body;
  try {
    if(!email || !password){
      return res.status(400).json({
        success : false,
        message : "All fields are required"
      })
    }

    const user = await User.findOne({email}).select("+password")

    if (!user || !(await user.matchPassword(password))){
      return res.status().json({
        success : false,
        message : "Invalid credentials"
      })
    }

    const token = await signToken(user._id)

    res.cookie("jwt",token,{
      maxAge : 7*24*60*60*1000,
      httpOnly : true,
      samesite : "strict",
      secure : process.env.NODE_ENV === 'production'
    })

    res.status(200).json({
      success : true,
      user
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, age, gender, genderPreference } = req.body;
  try {
    if (!name || !email || !password || !age || !gender || !genderPreference) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // USER'S ABOVE 18 YEARS SHOULD BE ALLOWED TO CREATE ACCOUNT
    if (18 > age) {
      return res.status(400).json({
        success: false,
        message: "You must be atleast 18 years old",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain a minimum of 6 characters",
      });
    }

    const newUser = await User.create({
      name,
      email,
      age,
      password,
      gender,
      genderPreference,
    });

    const token = await signToken(newUser._id)

    res.cookie("jwt",token,{
      maxAge : 7*24*60*60*1000,
      httpOnly : true,
      sameSite : "lax",
      secure : process.env.NODE_ENV === "production",
    })

    res.status(201).json({
      success : true,
      user : newUser,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "Server Error"
    })
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt")
  res.status(200).json({
    success : true,
    message : "Logged out successfully"
  })
};
