const { Schema, model } = require('mongoose');

const songSchema = new Schema({
    song_title: {
     type: String,
     required: true,
     trim: true,
    },
    artist: {
     type: String,
     required: true,
    },
    album: {
     type: String,
     required: true,
     maxlength: 24,
    },
    year: {
     required: Number,
     type: String,
     minNum: 1500,
     maxNum: 2023,
    },
    genre: {
     type: String,
     required: true,
     maxlength: 24,
    },
})

const Song = model('Song', songSchema);

module.exports = Song;