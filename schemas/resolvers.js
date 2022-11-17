const { User, Song } = require('../models');


const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');



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
    me: async (parent, args,context) => {
      if (!context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username,email,password,first_name,last_name,age }) => {
      return User.create({ username,email,password,first_name,last_name,age });
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },



    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this username address');
      }

      // const correctPw = await user.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError('Incorrect credentials');
      // }
      console.log(user);

      const token = signToken(user);

      return { token, user };
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
    removeSong: async (parent, { userId, songId}) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { playlist: { _id: {$eq: songId} } } },
        { new: true }
      );
    }
  },
};

module.exports = resolvers;
