
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


// app.get('/user', (req, res) => {

   
//     users.getUsers(req, res, next => {
//         res.send();
//     });
// });


// app.post('/createuser', (req, res) => {

//      users.createUser(req.body, (callback) => {
//         res.send();
//     });
// });


// app.get('/post', (req, res) => {

   
//     posts.getPosts(req, res, next => {
//         res.send();
//     });
// });


// app.post('/createpost', (req, res) => {

//      posts.createPost(req.body, (callback) => {
//         res.send();
//     });
// });







// app.get('/users', (req, res) => {

   
//     controller.getUsers(req, res, next => {
//         res.send();
//     });
// });


// app.post('/createuser', (req, res) => {

//      controller.addUser(req.body, (callback) => {
//         res.send();
//     });
// });

// app.post('/updateuser', (req, res) => {

//      controller.updateUser(req.body, (callback) => {
//         res.send();
//     });
// });

// app.post('/deleteuser', (req, res) => {

//      controller.deleteUser(req.body, (callback) => {
//         res.send();
//     });
// });


