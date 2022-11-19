const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const avatarSchema = new Schema({
    large: String,
    medium: String,
    thumbnail: String,
  });

const songSchema = new Schema({
  title: {
   type: String,
  //  required: true,
   trim: true,
  },
  artist: {
   type: String,
   required: true,
  },
  album: {
   type: String,
   required: true,
   maxlength: 100,
  },
  year: {
   type: String,
   required: true,
  },
  genre: {
   type: String,
  //  required: true,
   maxlength: 24,
  },
})

  
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"], //basic email match for testing
  },
  password: {
    type: String,
    required: true,
    maxlength: 24,
  },
  location: {
    type: String,
  },
  first_name: {
    type: String,
    maxlength: 24,
  },
  last_name: {
    type: String,
    maxlength: 24,
  },
  age: {
    type: Number,
  },
  avatar: [avatarSchema],
  playlist: [songSchema],
});




//! ------------------ after testing setup bcrypt --------------------------------------
//presave password to create encrypted password with 10 saltrounds - commented out for testing
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//password comparison hook commented out until testing is completed and bcrypt setup is initiated
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
//! -----------------------------------------------------------------------------------

const User = model("User", userSchema);

module.exports = User;
