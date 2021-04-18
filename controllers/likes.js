import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';
import Notifications from '../model/Notifications';


dotenv.config();

const post = async (io, data) => {
  try {
    let post = await Post.find({ file_id: Number(data.file_id) })
    console.log('uu', post)
    if (post[0].likes.some(like => like.user.toString() === data._id)) {
      Post.findOneAndUpdate({ file_id: Number(data.file_id) }, { $pull: { likes: { user: data._id } } },

        function (
          err,
          result
        ) {
          if (err) {
            console.log(err)
            //   res.send(err);
          } else {
            //   res.send(result);
          }
        });
      //   let pos = await Post.find({file_id: Number(data.post_id)})
      //   res.send(pos)
      data.like = "remove"
      console.log({ data })

      io.sockets.emit('like_post', data)
    } else {
      Post.findOneAndUpdate({ file_id: Number(data.file_id) }, { $push: { likes: { user: data._id } } },
        { upsert: true, new: true },
        function (
          err,
          result
        ) {
          if (err) {
            //   res.send(err);
            console.log(err)
          } else {
            //   res.send(result);
          }
        });
      data.like = "add"
      console.log({ data })

    //   file_id: 1616587579158,
    //   _id: '604cd585a3737e39c87d00f2',
    //   user: '604cd585a3737e39c87d00f2',
    //   sender_id: '604cd585a3737e39c87d00f2',
    //   receiver_id: '604cd585a3737e39c87d00f2',
    //   sender_image: 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif',
    //   receiver_image: 'https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif',
    //   sender_name: 'Lydia Beks',
    //   receiver_name: 'Lydia Beks',
    //   notificationType: 'likePost',
    //   like: 'add'
    // }

      await new Notifications({
        user: data.user,
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        sender_image: data.sender_image,
        receiver_image: data.receiver_image,
        sender_name: data.sender_name,
        receiver_name: data.receiver_name,
        notificationType: data.notificationType
      })
        .save().then(io.sockets.emit('like_post', data))
    }

    console.log('msg emmited', post)

  }
  catch (err) {
    console.log(err)
    // res.status(500).json({
    //     status:500,
    //      err:'server error'
    //  })
  }


}

export default post;