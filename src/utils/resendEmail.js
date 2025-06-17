import { Resend } from "resend";
import dotenv from "dotenv";
import { EmailHtml } from "./emailHtml.js";
import { Otp } from "../modals/otp.modal.js";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


export const resendEmail = async (req, res) => {

    // create a 6 digit otp
    const createOtp = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    try {
        const { to, title, content } = req.body;
        // Validate input
        if (!to || !title || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // create otp
        
        const newotp = new Otp({
            email: to,
            otp: createOtp(),
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minutes
        });

        // Generate a temporary token for the OTP
        const temporaryToken = newotp.generateTemporaryToken();
        newotp.temporaryToken = temporaryToken;

        // generate a deeplink using the temporary token
        const deeplink = `suggest://verify-otp?token=${temporaryToken}`;

        // console.log("Generated temporary token:", temporaryToken);

        await newotp.save();
        // console.log("OTP created:", newotp);

        const response = await resend.emails.send({
            from: "Suggest@studymonk.live",
            to: to,
            subject: "Verify Email",
            html: EmailHtml(title, content, newotp.otp, deeplink),
        });


        return res.status(200).json({
            message: "Email sent successfully",
            data: response,
            temporaryToken
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
            message: "Failed to send email",
            error: error.message
        });
    }
}