const express = require('express');
const followRouter = express.Router();
const followController = require('../controllers/follow.controller');
const identifyUser = require('../middleware/auth.middleware');

followRouter.post('/:username', identifyUser, followController.followUserController)
followRouter.post('/unfollow/:username', identifyUser, followController.unfollowUserController)

module.exports = followRouter;