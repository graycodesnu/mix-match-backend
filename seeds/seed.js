const db = require('../config/connection');
const { User } = require('../models');
const userSeed = require('./userSeed.json');

console.log(userSeed)

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(userSeed.users)
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
