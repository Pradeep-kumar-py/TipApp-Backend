import { Otp } from "../modals/otp.modal.js";

export const ValidateOtpAurToken = async (req, res) => {
    try {
        // get otp ya token from user when it hit this api route
        const { otp, temporaryToken } = req.body;

        
        // check if otp ya token is not empty
        if (!otp && !temporaryToken) {
            return res.status(400).json({ message: "OTP or token is required" });
        }

        // check if otp ya token is valid
        const otpData = await Otp.findOne({
            $or: [
                { otp: otp },
                { temporaryToken: temporaryToken }
            ]
        });

        if (!otpData) {
            return res.status(400).json({ message: "Invalid OTP or token" });
        }

        // check if otp ya token is expired
        const currentTime = new Date();
        if (otpData.expiresAt < currentTime) {
            return res.status(400).json({ message: "OTP or token has expired" });
        }

        // if otp ya token is valid, delete it from database
        await Otp.deleteOne({ _id: otpData._id });

        return res
            .status(200)
            .json({ message: "verification compleated" });


    } catch (error) {
        console.error("Error validating OTP or token:", error);
        return res.status(500).json({
            message: "Failed to validate OTP or token",
            error: error.message
        });
    }
}
