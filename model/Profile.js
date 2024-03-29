const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  cover: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  name: {
    type: String,
    // required: true
  },
  email:{
    type: String
  },
  status: {
    type: String,
    // required: true
  },
  image: {
    type: String,
  },
  skills: {
    type: [String],
    // required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },

  sentRequests:[
    {
      user:{
        type: String
      },
    }
  ],

  friendRequests:[
    {
      user:{
        type: String
      },
      username:{
        type: String
      },
      email:{
        type: String
      },
      senderImage:{
        type: String
      },
      receiverImage:{
        type: String
      }
    }
  ],
  friendsList:[
    {
      user:{
        type: String
      },
      username:{
        type: String
      },
      email:{
        type: String
      },
      senderImage:{
        type: String
      },
      receiverImage:{
        type: String
      }
    }
  ],
  searchedProfiles:[
    {
      user:{
        type: String
      },
      username:{
        type: String
      },
      email:{
        type: String
      },
      sentRequests: [
        {
        user: {
          type: String,
        }
      }
      ]
    }
  ],
  experience: [
    {
      title: {
        type: String,
        // required: true
      },
      company: {
        type: String,
        // required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        // required: true
      },
      degree: {
        type: String,
        // required: true
      },
      fieldofstudy: {
        type: String,
        // required: true
      },
      from: {
        type: Date,
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Profile = mongoose.model('userprofile', ProfileSchema);
export default Profile;