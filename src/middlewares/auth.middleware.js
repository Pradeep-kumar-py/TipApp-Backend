import jwt from 'jsonwebtoken';
import { User } from '../modals/user.modal.js';


 export const ProtectRoute = async (req, res, next) => {
    try {
        // get token from user
        const token = req.header("Authorization").replace("Bearer ", "");

        // check if token is valid
        if (!token) {
            return res.status(401).json({ message: "Unauthorized user" });
        }


        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        const user = await User.findById(decoded.id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error from Protect route" });

    }

}