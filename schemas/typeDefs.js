const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    playlist: [Song]
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    songs: [Song]!
    song(songId: ID!): Song
  }

  type Mutation {
    addUser(name: String!): User
    removeUser(userId: ID!): User
    addSong(userId: String!, songId: String!, title: String!, artist: String!, album: String!, year: String!): User
    removeSong(userId: ID!, songId: ID!): User
  }

  type Song {
    _id: ID
    title: String
    artist: String
    album: String
    year: String
  }
`;

module.exports = typeDefs;
