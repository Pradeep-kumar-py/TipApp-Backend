import { upload } from "../middlewares/multer.middleware.js";
import { Book } from "../modals/book.model.js";
import { uploadImage } from "../utils/cloudinary.js";


export const uploadProfileImage = async (req, res) => {
    try {
        // get the file fr;om the request
        const profileImage = req.file || null
        console.log("file: ",profileImage);

        // Check if the file wis present
        if (!profileImage) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload the image to Cloudinary
        const result = await uploadImage(profileImage);
        console.log("result: ",result);

        // Check if the upload was successful
        if (!result) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        const user = req.user;
        user.profileImage = result;
        await user.save();


        // Return the image URL in the response
        return res.status(200).json({ imageUrl: result });
        
    } catch (error) {
        // Handle any errors that occur during the upload process
        console.error("Error uploading image:", error.message);
        console.error("Error stack:", error.stack);
        return res.status(500).json({ 
            message: "Server error from uploadProfileImage",
            errorDetails: error.message 
        });;
    }
}



// controller to upload book schema to database

export const uploadBook = async (req, res) => {
    try {
        // get book info body
        const { title, caption, rating, link, genre  } = req.body;
        console.log("body: ",req.body);

        // verify it is empty or not
        if (!title || !caption || !rating || !genre ) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // get image from request
        const image = req.file || null;
        console.log("imagefile: ",image);

        // Check if the image is present
        if (!image) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Upload the image to Cloudinary
        const result = await uploadImage(image);
        console.log("result: ",result);

        // Check if the upload was successful
        if (!result) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        //get user from request
        const user = req.user;
        
        // create book object

        const book = new Book({
            title,
            caption,
            image: result,
            rating,
            user: user._id,
            link,
            genre,
        });

        // save book to database
        await book.save();

        console.log("book: ",book);

        // send response

        return res.status(200).json({
            message: "Book uploaded successfully",
            book,
        });

    } catch (error) {
        console.error("Error uploading book:", error);
        return res.status(500).json({ message: "Server error from uploadBook" });
    }

}
