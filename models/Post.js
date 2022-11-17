const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    createdAt: {
     type: Date,
     required: true,
     default: Date.now,
    },
    content: {
     type: String,
     required: true,
     maxlength: 255,
    },
    user_name: {
     type: String,
     require: true
    },
    user_visibility: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song',
        },
    ],
})

const Post = model('Post', postSchema);

module.exports = Post;