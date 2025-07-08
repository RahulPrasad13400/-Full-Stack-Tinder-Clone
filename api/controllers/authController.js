import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    if (18 < age) {
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

  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {};
