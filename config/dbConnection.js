const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING ,{useNewUrlParser: true, useUnifiedTopology: true,});
        console.log("Database Connected Successfully", connect.connection.host, connect.connection.name);
        
    }
    catch(err){
        console.log("Error Connecting to DB",err);
        process.exit(1);
    }
}

module.exports = connectDB;