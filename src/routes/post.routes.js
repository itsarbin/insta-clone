const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const uplod = multer({storage:multer.memoryStorage()});
const identifyUser = require('../middleware/auth.middleware');


postRouter.post('/', uplod.single('image'), identifyUser, postController.creatPostController)

postRouter.get('/', identifyUser, postController.getAllPostsController)
postRouter.get('/details/:postId', identifyUser, postController.getPostDetailsByIdController)
postRouter.post('/like/:postId', identifyUser, postController.likePost)
postRouter.post('/posts/:username', identifyUser,postController.getAllFolloweePosts)





module.exports = postRouter;