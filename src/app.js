import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

connectDB();

/**
 * Global middlewares
 */
// -> receive JSON data in the request body
app.use(express.json());

// Defining the routes
// -> authentication route (registration and login)
app.use("/auth", authRoutes);

// Order routing (CRUD and Mapping)
app.use("/order", orderRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Jitterbit Order API is running!",
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

// Handling route not found (404)
app.use((req, res) => {
    res.status(404).json({
        message: "Error 404: Route not found. Check the URL and HTTP method.",
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n Server started successfully!`);
    console.log(`Port: ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Press CTRL+C to stop the server.\n`);
});

export default app;
