  
import dotenv from 'dotenv';
// import User from '../model/User';
import Post from '../model/Post';
import Profile from '../model/Profile';
import Story from '../model/Story';
// import Images from '../model/Images';

const getStory = async(req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.payload.id });
        // console.log({profile})
        const frnds = []

        profile.friendsList.map((frnd,i) => {
            console.log('vcv',frnd.user)
            frnds.push(frnd.user)
        })

        console.log(frnds)



        const story = await Story.find().sort({date: -1 })
        if(!story){
            res.status(404).json({
                status:404,
                error:'no post available'
            })
        }
        console.log('vv')
      const allStories = await Story.find({user_id: {$in: frnds}})
      console.log({allStories})

        res.status(200).json(
            allStories
        )
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }

}
export default getStory;