const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config(); // Loads environment variables

// Import Routes
const AuthRouter = require("./Routers/authRouter");
const ProductRouter= require("./Routers/productRouter");

// Connect to DB
require("./Models/db");

// Middlewares
app.use(bodyParser.json()); // Parse JSON body
app.use(cors()); // Enable CORS

// Health Check Route
app.get("/ping", (req, res) => {
    res.send("PONG");
});

// Auth Routes
app.use("/auth", AuthRouter);

// Product Routes
app.use("/products", ProductRouter)

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
