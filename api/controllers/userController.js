import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherData } = req.body;
    let updatedData = otherData;
    if (image) {
        // base 64 format
        if(image.startsWith("data:image")){
          console.log("I work here")
            try {
                const uploadResponse = await cloudinary.uploader.upload(image)
                console.timeLog("upload response", uploadResponse)
                updatedData.image = uploadResponse.secure_url
            } catch (error) {
                return res.status(400).json({
                    success : false,
                    message : "Error Uploading image"
                })
            }
        }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    res.status(200).json({
        success : true,
        user : updatedUser
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
