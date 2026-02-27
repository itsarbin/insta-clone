const followModel = require('../model/follow.model');
const userModel = require('../model/user.model');

async function followUserController(req, res) {
    const followUsername = req.user.username
    const followeeUsername = req.params.username;
    let statusValue = null;


    const followeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!followeExists) {
        return res.status(404).json({
            message: "User to follow not found"
        })
    }


    if (followUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    if (followeExists.isPrivate) {
        statusValue = "pending"
    } else {
        statusValue = "accepted"
    }



    const followRecord = await followModel.create({
        follower: followUsername,
        followee: followeeUsername,
        status: statusValue
    })
    res.status(201).json({
        message: "followed successfully",
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const followUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isfollwing = await followModel.findOne({
        follower: followUsername,
        followee: followeeUsername
    })

    if (!isfollwing) {
        return res.status(400).json({
            message: "You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isfollwing._id);
    res.status(200).json({
        message: "Unfollowed successfully"
    })
}

async function acceptFollowController(req, res) {
    const follower = req.params.username;
    const user = req.user.username;

    const followRequest = await followModel.findOne({
        follower,
        followee: user,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: 'Follow request not found'
        })
    }

    const updatedFollowRequest = await followModel.findByIdAndUpdate(
        followRequest._id,
        { status: "accepted" },
        { new: true }
    )

    res.status(200).json({
        message: "Follow request accepted",
        updatedFollowRequest
    })
}

async function rejectFollowController(req, res) {
    const follower = req.params.username;
    const user = req.user.username;

    const followRequest = await followModel.findOne({
        follower,
        followee: user,
        status: "pending"
    })

    if (!followRequest) {
        return res.status(404).json({
            message: 'Follow request not found'
        })
    }

    const updatedFollowRequest = await followModel.findByIdAndUpdate(
        followRequest._id,
        { status: "rejected" },
        { new: true }  
    )

    res.status(200).json({
        message: "Follow request rejected",
        updatedFollowRequest
    })
        
        
}


module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowController,
    rejectFollowController
}