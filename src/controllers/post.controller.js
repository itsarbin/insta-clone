import ImageKit from '@imagekit/nodejs';
import { toFile } from '@imagekit/nodejs';

const jwt = require('jsonwebtoken');
const postModel = require('../model/post.model');



const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function creatPostController(req, res) {

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:'Token not povided or Unauthorized'
        })


    }

    let decoded=null;
    
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }


    if (!req.file) {
        return res.status(400).json({
            message: "Image is required"
        });
    }

    const uploadedFile = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder:'insta-clone/posts'
    });

    res.status(200).json(uploadedFile);

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: uploadedFile.url,
        user: decoded.id
    })

    res.status(201).json({
        message: 'Post created successfully',
        post
    })



};

    module.exports = {
        creatPostController
    }