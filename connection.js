const mongoose = require('mongoose');

const Connection = async (username, password) => { 
    const url = `mongodb+srv://${username}:${password}@backend.ejl2nka.mongodb.net/?retryWrites=true&w=majority&appName=backend`;
    try {
        await mongoose.connect(url);
        console.log("Connected with mongodb");
    }
    catch(error) {
    console.log("Failed !", error);
}
}

module.exports = Connection;

