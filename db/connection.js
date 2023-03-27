const mongoose = require('mongoose')
mongoose.set("strictQuery", false);



const connectDB = (uri) => {
    console.log('db connected');

    return mongoose.connect(uri ,  { useUnifiedTopology: true, useNewUrlParser: true })
}


module.exports = connectDB;