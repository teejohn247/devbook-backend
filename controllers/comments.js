import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';
import Notifications from '../model/Notifications';


dotenv.config();

 const comments= async(io,data) => {
  try{
    let post = await Post.find({file_id: Number(data.file_id)})
    console.log('uu', post)

        Post.findOneAndUpdate({file_id: Number(data.file_id)}, { $push: {comments: {comment_id:data.comment_id, user_image: data.user_image, text: data.text, name: data.name} }},
        { upsert: true, new: true },
        function(
            err,
            result
          ) {
            if (err) {
            //   res.send(err);
            console.log(err)
            } else {
                console.log(err)
            //   res.send(result);
            }
          });

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
            .save().then(io.sockets.emit('add_comment', data))

    // }
  

    // console.log('add_comment', post)
   
} 
catch(err){
    console.log(err)
    // res.status(500).json({
    //     status:500,
    //      err:'server error'
    //  })
 }

    
    }

export default comments;