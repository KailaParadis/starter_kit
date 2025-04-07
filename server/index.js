import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import recipeRouter from './routers/recipe_router.js';

dotenv.config({ path: "./server/.env"});
console.log("MONGO URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 8001;

//middleware
app.use(cors());
app.use(express.json());

// route
app.use("/recipe", recipeRouter);

//starting the server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT} `);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error, ', error);
    });