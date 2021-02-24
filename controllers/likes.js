import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';

dotenv.config();

 const post = async(req,res) => {
  try{
    let post = await Post.find({file_id: Number(req.params.post_id)})
    console.log('uu', post)
    if (post[0].likes.some(like => like.user.toString() === req.payload.id)){
        // console.log('m',like.user.toString())
        Post.findOneAndUpdate({file_id: Number(req.params.post_id)}, { $pull: {likes: {user: req.payload.id} }},
        
        function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
            //   res.send(result);
            }
          });
          let pos = await Post.find({file_id: Number(req.params.post_id)})
          res.send(pos)
    // console.log('uu', post) 
    }else{
        Post.findOneAndUpdate({file_id: Number(req.params.post_id)}, { $push: {likes: {user: req.payload.id} }},
        { upsert: true, new: true },
        function(
            err,
            result
          ) {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });

    }
    // var arr = {user: req.payload.id}
        // data.images.map((file,i) => {
        //     var new_obj = {};
        //     new_obj.file_id = data.file_id;
        //     new_obj.image = file;
        //     arr.push(new_obj);
        // })

        // console.log(
        //     [...post[0].likes, {user: req.payload.id}],
        //     post[0].file_id,
        //     post[0].text,
        //     post[0].name,
        //     post[0].email
        // )

        // await Post.updateOne({file_id: Number(req.params.post_id)}, 
        // { $push: {user: req.payload.id} },
        //  function(err) {
        //     console.log(err)
        // })

        

        // post.findOneAndUpdate({file_id: Number(req.params.post_id)},
        //     { $set: {"likes": [{
        //         "user":req.payload.id,
        //     }]}
        //     })



        

    // await new Post({
    //     file_id: post[0].file_id,
    //     text: post[0].text,
    //     name: post[0].name,
    //     likes: [...post[0].likes, {user: req.payload.id}],
    //     email:post[0].email
    // })
    // .save()
    // res.status(200).json(
    //     post[0].likes
    // )
    // let post = await Post.find({file_id: Number(req.params.post_id)})

    console.log('msg emmited', post)
    // post[0].likes.unshift({ user: req.payload.id });
    // post.save().then(post => res.json(post[0].likes));
    // res.status(200).json(
    //     post[0].likes
    // )[]
} 
catch(err){
    res.status(500).json({
        status:500,
         err:'server error'
     })
 }

    // {
    //     console.log(typeof(req.params.post_id))
    //        await Post.find({file_id: Number(req.params.post_id)})
    //         .then(post => {
    //           if (
    //             post.likes.some(like => like.user.toString() === req.payload.id)
    //           ) {
    //             return res
    //               .status(400)
    //               .json({ alreadyliked: 'User already liked this post' });
    //           }
    
    //           // Add user id to likes array
    //           post.likes.unshift({ user: req.payload.id });
    
    //           post.save().then(post => res.json(post.likes));
    //         })
    //         .catch(err => res.status(500).json({ postnotfound: 'No post found' }));
    //   }
    }

export default post;