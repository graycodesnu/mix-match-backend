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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    matches: async (parent, {userId}) => {
        // my likes
        return User.findOne({ _id: userId })
        // console.log(likes)

        // return User.find(
        //   {
        //     likes: {userid: context.user._id}
        //     //and people where my id is in their likes
        //   }
        // 

    }
    
  },

  Mutation: {
    addUser: async (parent, { first_name, last_name, age, username, email, password, playlist }) => {
      console.log(first_name)
      console.log(last_name)
      console.log(age)
      console.log(username)
      console.log(email)
      console.log(password)
      console.log('hello')
      const numAge = Number(age)
      const user = await User.create({ first_name, last_name, numAge, username, email, password, playlist })
      const token = signToken(user);

      return { token, user };

    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('User credentials are invalid');
      }

//! ----------- BCRYPT -----------
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
//! ----------- BCRYPT END -----------

      const token = signToken(user);
      return { token, user };
    },


    
  addSong: async (parent, { playlist }, context) => {
    if (context.user) {
      console.log(playlist)
      return User.findOneAndUpdate(
        { _id: context.user._id },
        {
          playlist:  playlist
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    },
    removeSong: async (parent, { userId, songId}) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { playlist: { _id: {$eq: songId} } } },
        { new: true }
      );
    },
 
  likeUser: async (parent, {userId}, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { likes: {userId: userId} } },
        { new: true }
      );
    }
  },
},
};

module.exports = resolvers;
