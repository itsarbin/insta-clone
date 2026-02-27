const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const postModel = require('../model/post.model');
const likeModel = require('../model/like.model');
const followModel = require('../model/follow.model');
const userModel = require('../model/user.model')



const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function creatPostController(req, res) {



    if (!req.file) {
        return res.status(400).json({
            message: "Image is required"
        });
    }

    const uploadFile = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder: 'insta-clone/posts'
    });



    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: uploadFile.url,
        user: req.user._id
    })

    res.status(201).json({
        message: 'Post created successfully',
        post
    })



};

async function getAllPostsController(req, res) {



    let userId = req.user._id;


    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: 'Posts fetched successfully',
        posts
    })

}

async function getPostDetailsByIdController(req, res) {



    const viewerId = req.user._id;
    const viewerName = req.user.username;

    const post = await postModel.findById(req.params.postId);

    if (!post) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }


    if (post.user.toString() === viewerId.toString()) {
        return res.status(200).json({
            message: 'Post details fetched successfully',
            post
        })
    };

    const owner = await userModel.findById(post.user)

    if (!owner.isPrivate) {
        return res.status(200).json({
            message: 'Post details fetched successfully',
            post
        })
    }

    const isAcceptedFollower = await followModel.findOne({
        follower: viewerName,
        followee: owner.username,
        status: 'accepted'
    })

    if (!isAcceptedFollower) {
        return res.status(403).json({
            message: "The account is Private.",
            post
        })
    }



}


async function likePost(req, res) {
    const postId = req.params.postId;
    const username = req.user.username;

    const postExists = await postModel.findById(postId);

    if (!postExists) {

        return res.status(404).json({
            message: 'Post not found'
        })
    }

    const alreadyLiked = await likeModel.findOne({
        postId,
        username
    })

    if (alreadyLiked) {
        return res.status(400).json({
            message: 'You have already liked this post'
        })
    }

    const likeRecord = await likeModel.create({
        postId,
        username
    })

    res.status(200).json({
        message: 'Post liked successfully',
        likeRecord
    })

}


async function getAllFolloweePosts(req, res) {

    const viewer = req.user; // logged in user
    const followee = await userModel.findOne({
        username: req.params.username
    });


    if (!followee) {
        return res.status(404).json({
            message: "Followee user not found"
        });
    }

    if (viewer._id.toString() === followee._id.toString()) {

        const posts = await postModel.find({
            user: followee._id
        });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
    }


    if (!followee.isPrivate) {

        const posts = await postModel.find({
            user: followee._id
        });

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
    }


    const isAcceptedFollower = await followModel.findOne({
        follower: viewer.username,
        followee: followee.username,
        status: "accepted"
    });

    if (!isAcceptedFollower) {
        return res.status(403).json({
            message: "This account is private"
        });
    }

    const posts = await postModel.find({
        user: followee._id
    });

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    });
}












module.exports = {
    creatPostController,
    getAllPostsController,
    getPostDetailsByIdController,
    likePost,
    getAllFolloweePosts
}