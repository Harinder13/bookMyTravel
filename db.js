const mongoose = require('mongoose');


//function mongodb db connection
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {

        })
        console.log(`connected to database${mongoose.connection.host}`);


    } catch (error) {
        console.log('DB Error', error);

    }
};
module.exports = db;