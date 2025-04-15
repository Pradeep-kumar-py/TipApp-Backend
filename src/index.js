import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import uploadRoutes from './routes/upload.route.js';
import bookRoutes from './routes/book.route.js';
import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';
dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes for handling user-related requests
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/book", bookRoutes);







app.get("/", (req, res) => {
    res.send("API is running...")
});

app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });
  

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
});



