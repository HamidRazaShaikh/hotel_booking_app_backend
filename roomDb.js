require('dotenv').config();
const connectDB = require('./db/connection');
const RoomSchema = require('./models/RoomSchema');
const roomJsonData = require('./data.json');


const start =async()=>{

    try{

        await connectDB(process.env.MONGODB_URI);
        await RoomSchema.create(roomJsonData)
        console.log('success');

    }
    catch(error){

        console.log(error);
    }
}


start()