import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Profile from '../model/Profile';
import User from '../model/User';




const editProfile = async (req, res) => {
    try {
        const prof = await Profile.findOne({ user: req.payload.id });
        const user = await User.findOne({ user: req.payload.id });

        console.log({prof})

        if (!prof) {
            res.status(404).json({
                status: 404,
                error: 'No user Found'
            })
            return
        }
        await user.updateOne({
            name:req.body.name,
            // company: req.body.company,
            // cover: req.body.cover,
            // website: req.body.website,
            // location: req.body.location,
            // status: req.body.status,
            // skills: req.body.skills.split(','),
            // bio: req.body.bio,
            image: req.body.image,
            // githubusername: req.body.githubusername
        },user)
        
      await prof.updateOne({
            name:req.body.name,
            company: req.body.company,
            cover: req.body.cover,
            website: req.body.website,
            location: req.body.location,
            status: req.body.status,
            skills: req.body.skills.split(','),
            bio: req.body.bio,
            image: req.body.image,
            githubusername: req.body.githubusername
        },prof)

    let profile = await Profile.findOne({ user: req.payload.id });
    res.status(200).json(
        profile
    ) 
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            err: 'server error'
        })
    }
};

export default editProfile;