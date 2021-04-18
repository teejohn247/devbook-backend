const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user: {
    type: String,
    required: true
    // type: Schema.Types.ObjectId,
    // ref: 'user'
  },
  msg: {
    type: String,
    // required: true
  },
  sender_id: {
    type: String,
    required: true
  },
  receiver_id: {
    type: String,
    required: true
  },
  sender_image: {
    type: String,
  },
  receiver_image: {
    type: String,
  },
  sender_name: {
    type: String,
  },
  receiver_name: {
    type: String,
  },
  chatsBetween:{
      type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Chat = mongoose.model('chat', ChatSchema)
export default Chat;