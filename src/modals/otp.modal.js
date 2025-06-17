import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    temporaryToken: {
        type: String,
        default: "" // This will hold the temporary token generated for the OTP
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

otpSchema.methods.generateTemporaryToken = function () {
    return uuidv4().replace(/-/g, '') // Generate a unique temporary token using uuid
}

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model("Otp", otpSchema);