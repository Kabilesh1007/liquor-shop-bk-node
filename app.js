const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const MONGODB_URL = "mongodb://127.0.0.1:27017/liquorshop001";

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`${MONGODB_URL} connection Successfull...`);
    })
    .catch((err) => {
        console.error("Error in connecting to mongodb", err.message);
    });

app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Import and use your routes
const userRoutes = require('./routes/UserRoutes');
app.use(userRoutes);

const productRoutes = require('./routes/ProductRoutes');
app.use(productRoutes);

const verifyToken = require("./middleware/AuthMiddleware");

app.get("/unprotected", (req, res) => {
    res.status(200).send("This is an unprotected API");
});

app.get("/protected", verifyToken, (req, res) => {
    res.status(200).send("This is a protected API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
