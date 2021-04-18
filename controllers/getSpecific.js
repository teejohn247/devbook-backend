import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';

const getSpecific = async(req, res) => {
    try{
        const profile = await Profile.findOne({user:req.params.id})
        if(!profile){
            res.status(404).json({
                status:404,
                error:'profile not found'
            })
            return;
        }
        res.status(200).json(
            profile
        )
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default getSpecific;