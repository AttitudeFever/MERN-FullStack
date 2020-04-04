require('dotenv').config();
const mongoose = require('mongoose');
let db;

//connect to MogoDb Atlas Database
const connect = () => {
    const opt = {
        useUnifiedTopology: true,
        useNewUrlParser: true
    };
    mongoose.connect(process.env.MONGO_URL, opt);
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("connected to mongo");
    });
};

//handle close connection
const close = () => {
    console.log("db connection closed")
    try {
        db.close();
    }
    catch{}
}

module.exports = {
    connect,
    close
    };