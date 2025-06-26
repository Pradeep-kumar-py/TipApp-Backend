import mongoose, { Schema } from 'mongoose';


const bookSchema = new Schema({
    //Book Schema
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    link: {
        type: String,
        default: "",
    },
    genre: {
        type: String,
        required: true,
        default: ""
    },

}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);
