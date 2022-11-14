const db = require('../config/connection');
const { User, Song } = require('../models');
const userSeed = require('./userSeed.json');
const songSeed = require('./songSeed.json');

console.log(userSeed)

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(userSeed.users)

    await Song.deleteMany({});
    await Song.insertMany(songSeed.songs)

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
