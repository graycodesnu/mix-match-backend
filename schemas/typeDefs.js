const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    first_name: String
    last_name: String
    location: String
    age: Int
    playlist: [Song]
    avatar: [Avatar]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Avatar {
    large: String
    medium: String 
    thumbnail: String
  }

  type Song {
    _id: ID
    title: String
    artist: String
    album: String
    year: String
  }
  input SongInput {
    _id: ID
    title: String
    artist: String
    album: String
    year: String
   }
  type Query {
    users: [User]!
    user(userId: ID!): User
    songs: [Song]!
    song(songId: ID!): Song
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String, password: String!, age: Int): Auth
    login(username: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addSong(playlist: [SongInput]): User
    removeSong(userId: ID!, songId: ID!): User
  }


`;

module.exports = typeDefs;
