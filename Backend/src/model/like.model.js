const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:[true,'post id is required']
    },
    username:{
        type:String,
        required:[true,'username is required']
    }
})

likeSchema.index({postId:1, username:1}, {unique:true});

const likeModel = mongoose.model('likes', likeSchema);

module.exports = likeModel;