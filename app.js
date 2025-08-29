
const express = require('express');
const app = express();
const cors = require('cors');
const posts = require('./controllers/post');
const users = require('./controllers/users');
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.use('/uploads', express.static('uploads'));
app.use('/useruploads', express.static('useruploads'));

app.use('/api', router); 

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;


