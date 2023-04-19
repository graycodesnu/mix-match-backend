const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://graycodesnu:XLtpPHx3qvjrSXOZ@cluster0.a4fhmmz.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
