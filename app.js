
const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

// Middleware to read JSON data
app.use(express.json());

// Custom Logger Middleware
app.use(logger);

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Student Management REST API is Running");
});

// Student routes
app.use("/students", studentRoutes);

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
