const { Schema, model } = require(mongoose);
// const bcrypt = require('bcrypt');  commenting out bcrypt until testing is completed and code is added

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
     match: [/.+@.+\..+/, 'Must match an email address!'], //basic email match for testing
    },
    password: {
     type: String,
     required: true,
     maxlength: 5,
    },
    location: {
     type: String,
     require: true
    },
    first_name: {
     type: String,
     required: true,
     maxlength: 24,
    },
    last_name: {
     type: String,
     required: true,
     maxlength: 24,
    },
    age: {
     type: Number,
     required: true,
    },
    avatar: {
     type: String,
    },
    playlist: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Song',
        }
    ]
})

//------------------ after testing setup bcrypt --------------------------------------
//presave password to create encrypted password with 10 saltrounds - commented out for testing
// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//       const saltRounds = 10;
//       this.password = await bcrypt.hash(this.password, saltRounds);
//     }
  
//     next();
// });

//password comparison hook commented out until testing is completed and bcrypt setup is initiated
// userSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };
//-----------------------------------------------------------------------------------

const User = model('User', userSchema);

module.exports = User;