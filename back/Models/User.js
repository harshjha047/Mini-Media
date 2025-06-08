const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/social-media-mini-app');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  bio: {
    type: String,
    default: '',
    maxlength: 150,
  },

  avatar: {
    type: String, 
    default: '',  
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
