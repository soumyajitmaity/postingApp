const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    userid:{
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }



},{timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports = User;