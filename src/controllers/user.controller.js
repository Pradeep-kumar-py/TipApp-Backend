import { User } from "../modals/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const registerUser = async (req, res) => {
    try {
        // get data from request body
        const { name, email, password, } = req.body;

        //check it is empty or not
        if (name === "" || email === "" || password === "") {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        //create a new user
        const newUser = new User({
            name,
            email,
            password,
        });

        
        //generate access token and refresh token
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();
        //save refresh token in database
        newUser.refreshToken = refreshToken;
        await newUser.save();

        // check if user is created or not
        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(400).json({ message: "User not created" });
        }
        // send response
        return res.status(201).json({
            message: "User created successfully",
            user: createdUser,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Error in registerUser: ", error);
        return res.status(500).json({
            message: "Something went wrong while registering user",
            error: error.message
        });
    }

}

export const loginUser = async (req, res) => {
    try {
        // get data from request body
        const { email, password } = req.body;

        //check it is empty or not
        if (email === "" || password === "") {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password
        const isPasswordValid = await existingUser.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //generate access token and refresh token
        const accessToken = existingUser.generateAccessToken();
        const refreshToken = existingUser.generateRefreshToken();
        //save refresh token in database
        existingUser.refreshToken = refreshToken;
        await existingUser.save();

        //looged in user
        const loggedInUser = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            profileImage: existingUser.profileImage,
            createdAt: existingUser.createdAt,
            // other fields you want to include
        };

        // send response
        return res.status(200).json({
            message: "User logged in successfully",
            user: loggedInUser,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Error in loginUser: ", error);
        return res.status(500).json({
            message: "Something went wrong while logging in user",
            error: error.message
        });
    }
}
export const logoutUser = async (req, res) => {
    try {
        // get data from request body
        const refreshToken = req.header("Authorization").replace("Bearer ", "");

        //check it is empty or not
        if (!refreshToken) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ refreshToken });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // remove refresh token from database
        existingUser.refreshToken = null;
        await existingUser.save();

        // send response
        return res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error("Error in logoutUser: ", error);
        return res.status(500).json({
            message: "Something went wrong while logging out user",
            error: error.message
        });
    }
}


export const getAllUser = async (req, res) => {
    try {
        // get all user from database
        const users = await User.find()
            .select("-password -refreshToken")
            .sort({ createdAt: -1 });
            console.log(users);

        // response the users
        return res.status(200).json({
            message: "All users fetched successfully",
            users,
            count: users.length,
        });
    } catch (error) {
        console.error("Error in getAllUser: ", error);
        return res.status(500).json({
            message: "Something went wrong while fetching users",
            error: error.message
        });

    }
}



export const generateNewAccessToken = async (req, res) => {
    try {
        const refreshToken = req.header("Authorization").replace("Bearer ", "");

        // Check if the refresh token is provided
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        // Verify the refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired refresh token" });
        }

        // Find the user associated with the refresh token
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const newAccessToken = user.generateAccessToken();

        // Send the new access token in the response
        return res.status(200).json({
            message: "New access token generated successfully",
            accessToken: newAccessToken,
        });
    } catch (error) {
        console.error("Error in generateNewAccessToken: ", error);
        return res.status(500).json({
            message: "Something went wrong while generating a new access token",
            error: error.message,
        });
    }
};

