const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  file_id: {
    type: Number,
    required: true
  },
//   name: {
//     type: String
//   },
  images: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Images = mongoose.model('images', ImagesSchema)
export default Images;