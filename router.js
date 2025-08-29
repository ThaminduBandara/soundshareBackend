
const express = require('express');
const router = express.Router();

const { getPosts, getPostById, createPost, updatePost, deletePost, upload } = require('./controllers/post');
const { getUsers, getUserById, createUser, updateUser, loginUser, fetchMe, useruploads } = require('./controllers/users');


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

router.post('/createuser', createUser);

router.post('/login', loginUser);

router.post('/fetchme', fetchMe);

router.patch('/updateuser/:id', useruploads.fields([{ name: 'profilePicture', maxCount: 1 },]), updateUser);

router.get('/user/:id', getUserById);



module.exports = router;