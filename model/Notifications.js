const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
  user: {
    type: String,
    required: true
    // type: Schema.Types.ObjectId,
    // ref: 'user'
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
  notificationType:{
      type: String
  },
  date: {
    type: Date,
    default: new Date().toISOString()
  },
  currenrDate: {
    type: Date,
    default: Date.now()
  },
  lastChecked: {
      type: Date
  }
});

const Notifications = mongoose.model('notifications', NotificationsSchema)
export default Notifications;