const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  text: {
    type: String,
    required: true
  },
  file_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  // images: {
  //   type: String
  // },
//   avatar: {
//     type: String
//   },
images: [
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    image: {
      type: String,
      required: true
    },
    file_id: {
      type: Number,
      required: true
    },
    // date: {
    //   type: Date,
    //   default: Date.now
    // }
  }
],
  likes: [
    {
      user: {
        type: String,
      }
      // user: {
      //   type: Schema.Types.ObjectId,
      //   ref: 'user'
      // }
    }
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('post', PostSchema)
export default Post;