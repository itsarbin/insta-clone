const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const multer = require('multer');
const uplod = multer({storage:multer.memoryStorage()});

postRouter.post('/', uplod.single('image'), postController.creatPostController)

postRouter.get('/', postController.getAllPostsController)
postRouter.get('/details/:postId', postController.getPostDetailsByIdController)




module.exports = postRouter;