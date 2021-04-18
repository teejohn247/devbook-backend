const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  file_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  user_image: {
    type: String,
},
  image: {
      type: String,
  },
  email: {
    type: String,
  },
 views: [
    {
      user: {
        type: String,
      },
      date: {
        type: Date,
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now 
  }
});

StorySchema.index( { "date": 1 }, { expireAfterSeconds: 86400 } )

const Story = mongoose.model('story', StorySchema)
export default Story;