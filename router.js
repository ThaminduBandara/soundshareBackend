
const express = require('express');
const router = express.Router();
const { getPosts, getPostById, createPost, updatePost, deletePost, upload } = require('./controllers/post');

const { getUsers, getUserById, createUser, updateUser, deleteUser, useruploads } = require('./controllers/users');
// const users = require('./controllers/users');
// const Post = require('./models/postModel');

// const controller = require('./controller');
// const posts = require('./controllers/post');


// router.get('/users', controller.getUsers);
// router.post('/createuser', controller.addUser);
// router.post('/updateuser', controller.updateUser);
// router.post('/deleteuser', controller.deleteUser);



router.get('/post', getPosts);

router.post('/createpost', upload.fields([
  { name: 'selectedMFile', maxCount: 1 },
  { name: 'selectedPFile', maxCount: 1 }
]), createPost);

router.patch('/updatepost/:id', upload.fields([
  { name: 'selectedMFile', maxCount: 1 },
  { name: 'selectedPFile', maxCount: 1 }
]), updatePost);

router.get('/post/:id', getPostById);

router.delete('/posts/:id', deletePost);




router.get('/user', getUsers);

router.post('/createuser', upload.fields([{ name: 'profilePicture', maxCount: 1 }]), createUser);
// router.post('/createuser', createUser);

router.patch('/updateuser/:id', upload.fields([{ name: 'profilePicture', maxCount: 1 },]), updateUser);

router.get('/user/:id', getUserById);

router.delete('/users/:id', deleteUser);


module.exports = router;