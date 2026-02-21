const postModel = require('../model/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function creatPostController(req, res) {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        const uploadedFile = await imagekit.files.upload({
            file: await toFile(req.file.buffer, req.file.originalname),
            fileName: req.file.originalname,
        });

        res.status(200).json(uploadedFile);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
}

module.exports = {
    creatPostController
};