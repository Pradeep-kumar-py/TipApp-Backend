import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profileImage: {
        type: String,
        default: '',
    },
    refreshToken: {
        type: String,
        default: '',
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
})

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Create a method to generate JWT token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            id: this._id 
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
}

//create a methid to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}

// Create a method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model('User', userSchema);
