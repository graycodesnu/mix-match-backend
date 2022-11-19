const db = require('../config/connection');
const { User, Song } = require('../models');
const userSeed = require('./userSeed.json');
const songSeed = require('./songSeed.json');

function generatePlaylist(user,songs=songSeed) {
  user.playlist = []
  for( i=0; i<10; i++) {
    let index=Math.floor(Math.random() * songs.songs.length)
    user.playlist.push(songs.songs[index])
  }
  return user
}

const userPlaylistSeed = userSeed.users.map(user => generatePlaylist(user))

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userPlaylistSeed)

    await Song.deleteMany({});
    await Song.create(songSeed.songs)

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
