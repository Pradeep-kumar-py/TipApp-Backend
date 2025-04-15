import { Book } from "../modals/book.model.js";
import { deleteImage } from "../utils/cloudinary.js";


export const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from query params, default to 1 
        const limit = parseInt(req.query.limit) || 10; // Get the limit from query params, default to 10
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const totalBooks = await Book.countDocuments(); // Get the total number of books
        const totalPages = Math.ceil(totalBooks / limit); // Calculate the total number of pages


        const books = await Book.find()
            .sort({ createdAt: -1 })
            .skip(skip) // Skip the documents for pagination
            .limit(limit) // Limit the number of documents returned
            .populate("user", "name profileImage") // Populate the author field with author details



        console.log("Books fetched successfully: ", books);
        // Check if books are found
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        // Return the books in the response
        return res.status(200).json({
            message: "All books fetched successfully",
            books,
            totalBooks,
            totalPages
        });

    } catch (error) {
        console.error("Error in getAllBooks: ", error);
        return res.status(500).json({
            message: "Something went wrong while fetching books from get all books",
        });

    }
}


export const deteteBook = async (req, res) => {
    try {
        // get book by id from params
        const bookId = req.params.id;

        // check if bookId is valid
        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        // check if book exists
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }


        // check if user is authorized to delete the book
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this book" });
        }


        // delete book
        const deletedBook = await Book.findByIdAndDelete(bookId);

        // check if book is deleted
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }



        // delete image from cloudinary
        const publicId = book.image.split("/").pop().split(".")[0]; // Extract public ID from image URL
        console.log("Image public ID: ", publicId);
        console.log("Image URL: ", book.image);

        const imageDeleted = await deleteImage(publicId);
        console.log("Image deleted from Cloudinary: ", imageDeleted);
        // Check if image deletion was successful
        if (!imageDeleted) {
            return res.status(500).json({ message: "Image deletion failed" });
        }


        // return success response

        console.log("Book deleted successfully: ", deletedBook);
        return res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook,
        });
    } catch (error) {
        console.error("Error in deleteBook: ", error);
        return res.status(500).json({
            message: "Something went wrong while deleting the book",
        });
    }
}