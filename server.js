const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnection');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

connectDB();
const PORT = process.env.PORT || 3000

// app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));
  
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/e-commerce", require("./routes/product"));
// app.use("/api/file-manipulation", require("./routes/user"));

app.listen(PORT, () => {
    console.log(`Server is running on the PORT ${PORT}`);
})
