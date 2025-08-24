
const express = require('express');
const router = express.Router();
// const controller = require('./controller');
const posts = require('./controllers/post');
const users = require('./controllers/users');


// router.get('/users', controller.getUsers);
// router.post('/createuser', controller.addUser);
// router.post('/updateuser', controller.updateUser);
// router.post('/deleteuser', controller.deleteUser);


router.get('/post', posts.getPosts);
router.post('/createpost', posts.createPost);
router.patch('/:id', posts.updatePost);


router.get('/user', users.getUsers);
router.post('/createuser', users.createUser);

module.exports = router;