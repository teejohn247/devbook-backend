import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';

const getProfile = async(req, res) => {
    try{
        const profile = await Profile.findOne({user:req.payload.id}).populate('devbookusers', ['name'])
            if (!profile) {
                res.status(404).json(
                    'No profile available'
                )
                return;
            }
       
        res.status(200).json(
            profile
        ) 
        return;
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
}
}
export default getProfile;