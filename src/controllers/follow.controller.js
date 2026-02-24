const followModel = require('../model/follow.model');
const userModel = require('../model/user.model');

async function followUserController(req,res){
    const followUsername = req.user.username
    const followeeUsername = req.params.username;


    const followeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!followeExists){
        return res.status(404).json({
            message:"User to follow not found"
        })
    }

    if(followUsername === followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }


    const followRecord = await followModel.create({
        follower: followUsername,
        followee: followeeUsername
    })
    res.status(201).json({
        message:"followed successfully",
        followRecord
    })
}

async function unfollowUserController(req,res){
        const followUsername = req.user.username;
        const followeeUsername = req.params.username;

        const isfollwing = await followModel.findOne({
            follower: followUsername,
            followee: followeeUsername
        })

        if(!isfollwing){
            return res.status(400).json({
                message:"You are not following this user"
            })
        }
        
        await followModel.findByIdAndDelete(isfollwing._id);
        res.status(200).json({
            message:"Unfollowed successfully"
        })
}


module.exports = {
    followUserController,
    unfollowUserController
}