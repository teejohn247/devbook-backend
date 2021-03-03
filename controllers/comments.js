import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';

dotenv.config();

 const comments= async(io,data) => {
  try{
    let post = await Post.find({file_id: Number(data.file_id)})
    console.log('uu', post)

        Post.findOneAndUpdate({file_id: Number(data.file_id)}, { $push: {comments: {comment_id:data.comment_id, text: data.text, name: data.name} }},
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
          io.sockets.emit('add_comment', data)

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