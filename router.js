
const express = require('express');
const router = express.Router();
// const controller = require('./controller');
// const posts = require('./controllers/post');
const { getPosts, createPost, updatePost, upload } = require('./controllers/post');
const users = require('./controllers/users');
const Post = require('./models/postModel'); 



// router.get('/users', controller.getUsers);
// router.post('/createuser', controller.addUser);
// router.post('/updateuser', controller.updateUser);
// router.post('/deleteuser', controller.deleteUser);


// router.get('/post', posts.getPosts);
router.get('/post', getPosts);
// router.post('/createpost', posts.createPost);

router.post('/createpost', upload.fields([
  { name: 'selectedMFile', maxCount: 1 },
  { name: 'selectedPFile', maxCount: 1 }
]), createPost);



// router.patch('/:id', posts.updatePost);


router.patch('/updatepost/:id', upload.fields([
  { name: 'selectedMFile', maxCount: 1 },
  { name: 'selectedPFile', maxCount: 1 }
]), updatePost);



router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



router.get('/user', users.getUsers);
router.post('/createuser', users.createUser);

module.exports = router;