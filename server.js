const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const product = require('./models/product');
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000

// app.get("/", (req, res) => {
//     res.send("Hello, Universe!");
// });

app.use(express.json());
app.use("/api/e-commerce", require("./routes/product"))

app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`);
})
