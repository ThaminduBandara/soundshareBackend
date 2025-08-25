
const express = require('express');
const app = express();
const cors = require('cors');
const post = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./router');
// const bodyParser = require('body-parser');


app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb', extended: true }));
app.use(cors());
// app.use(express.json());



// const uri = 'mongodb+srv://thamindubandara:THAM1ndu@cluster0.zguamfe.mongodb.net/soundshare?retryWrites=true&w=majority&appName=Cluster0';

const uri = 'mongodb+srv://thamindubandara:THAM1ndu@soundshare.zguamfe.mongodb.net/?retryWrites=true&w=majority&appName=soundshare'

const connect = async () => {
    try{
            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
    }catch (error) {
            console.log('Error connecting to MongoDB:', error);
    }
}

connect();

const server = app.listen(post , host , () => {
            console.log(`Node server is listning to ${server.address().port}`)
});

app.use('/api', router); 