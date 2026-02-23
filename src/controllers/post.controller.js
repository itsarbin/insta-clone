const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('../model/post.model');



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
        folder:'insta-clone/posts'
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

async function getAllPostsController(req, res){ 

 

    let userId = req.user._id;

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:'Posts fetched successfully',
        posts
    })

}

async function getPostDetailsByIdController(req, res){



    const userId = req.user._id;

    const post = await postModel.findById(req.params.postId);

    if(!post){
        return res.status(404).json({
            message:'Post not found'
        })
    }

    const isvalidUser = post.user.toString() === userId;

    if(!isvalidUser){
        return res.status(403).json({
            message:'Forbidden Access'
        })
    }

    res.status(200).json({
        message:'Post details fetched successfully',
        post
    })

}
   


    module.exports = {
        creatPostController,
        getAllPostsController,
        getPostDetailsByIdController
    }