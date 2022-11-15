const { User, Song } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    songs: async () => {
      return Song.find();
    },
    song: async (parent, { songId }) => {
      return Song.findOne({ _id: songId });
    },
  },

  Mutation: {
    addUser: async (parent, { username,email,password,first_name,last_name,age }) => {
      return User.create({ username,email,password,first_name,last_name,age });
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    addSong: async (parent, { userId, songId, title, artist, album, year }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { playlist: { songId, title, artist, album, year } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeSong: async (parent, { userId, songId }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { playlist: { _id: songId } } },
        { new: true }
      );
    }
  },
};

module.exports = resolvers;
