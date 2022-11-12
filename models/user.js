const { Schema, model } = require(mongoose);
// const bcrypt = require('bcrypt') 
// line 2 possibly needed for password encryption hook

const userSchema = new Schema({
    user_name: {
     type: String,
     required: true,
     unique: true,
     trim: true,
    },
    email: {
     type: String,
     required: true,
     unique: true,
     match: [/.+@.+\..+/, 'Must match an email address!'],
     // line 16 is a basic email match regEx will update this after testing
    },
    password: {
     type: String,
     required: true,
     maxlength: 24,
     trim: true,
    },
    location: {
     required:true,
     type: String,
    },
    first_name: {
     type: String,
     required: true,
     maxlength: 30,
     minlength: 3,
     trim: true,
    },
    last_name: {
     type: String,
     required: true,
     maxlength: 30,
     minlength: 3,
     trim: true,
    },
    age: {
     type: Number,
     required: true,
     trim: true,
    },
    avatar: {
     type: String,
    }
})

// commmented out for testing purposes - bcrypt not initialized
// userSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

const User = model('User', userSchema);

module.exports = User;