const { User } = require('../models/user');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return Profile.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username,email,password,language,first_name,last_name,age }) => {
      return User.create({ username,email,password,language,first_name,last_name,age });
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    }
  },
};

module.exports = resolvers;
