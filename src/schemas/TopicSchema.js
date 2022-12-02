const mongoose = require('mongoose')

const { Schema } = mongoose

const TopicSchema = new Schema({
    topicId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('topic', TopicSchema)