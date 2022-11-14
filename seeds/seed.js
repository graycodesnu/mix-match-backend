const db = require('../config/connection');
const { User } = require('../models');
const userSeed = require('./userSeed.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeed);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
