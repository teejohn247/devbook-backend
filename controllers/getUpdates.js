  
import dotenv from 'dotenv';
// import User from '../model/User';
import Post from '../model/Post';
import Profile from '../model/Profile';

// import Images from '../model/Images';

const getPosts = async(req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.payload.id });
        // console.log({profile})
        const frnds = [req.payload.id]

        profile.friendsList.map((frnd,i) => {
            console.log('vcv',frnd.user)
            frnds.push(frnd.user)
        })

        console.log(frnds)



        const posts = await Post.find().sort({date: -1 })
        if(!posts){
            res.status(404).json({
                status:404,
                error:'no post available'
            })
        }
        console.log('vv')
      const allposts = await Post.find({user_id: {$in: frnds}}).sort({date: -1 })
      console.log({allposts})

         res.status(200).json(
            allposts
        )
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }

}
export default getPosts;