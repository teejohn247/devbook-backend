import dotenv from 'dotenv';
import Profile from '../model/Profile';


dotenv.config();

 const profile = async(req,res) => {
try{
new Profile({
    user:req.payload.id,
    company: req.body.company,
    website: req.body.website,
    location: req.body.location,
    status:req.body.status,
    skills: req.body.skills.split(','),
    bio: req.body.bio,
    githubusername: req.body.githubusername
}).save().then(profile => res.json(profile));
  }
  catch(err){
    res.status(500).json({
        status:500,
         err:'server error'
     })
 }
}
export default profile;