import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';

dotenv.config();

 const post = async(io,data) => {
  try{
    let post = await Post.find({file_id: Number(data.file_id)})
    console.log('uu', post)
    if (post[0].likes.some(like => like.user.toString() === data._id)){
        Post.findOneAndUpdate({file_id: Number(data.file_id)}, { $pull: {likes: {user: data._id} }},
        
        function(
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
          io.sockets.emit('like_post', data)
    }else{
        Post.findOneAndUpdate({file_id: Number(data.file_id)}, { $push: {likes: {user: data._id} }},
        { upsert: true, new: true },
        function(
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
          io.sockets.emit('like_post', data)

    }
  

    console.log('msg emmited', post)
   
} 
catch(err){
    console.log(err)
    // res.status(500).json({
    //     status:500,
    //      err:'server error'
    //  })
 }

    
    }

export default post;