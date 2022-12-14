const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('user', UserSchema)