
import dotenv from 'dotenv';
import Profile from '../model/Profile';


const allProfiles = async (req, res) => {
    try {
        const profile = await Profile.find()
        res.status(200).json(
            profile
        )
        } catch (err) {
        res.status(500).json({
            status: 500,
            err: 'server error'
        })
    }

}
export default allProfiles;