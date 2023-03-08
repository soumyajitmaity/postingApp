const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    }
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;