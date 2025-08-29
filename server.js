
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;
const host = 'localhost';
const mongoose = require('mongoose');
const router = require('./router');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/useruploads', express.static(path.join(__dirname, 'useruploads')));

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb', extended: true }));
app.use(cors());


const uri = 'mongodb+srv://thamindubandara:THAM1ndu@soundshare.zguamfe.mongodb.net/soundshare?retryWrites=true&w=majority';

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB - soundshare');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};


connect();

const server = app.listen(port , host , () => {
            console.log(`Node server is listning to ${server.address().port}`)
});

app.use('/api', router); 