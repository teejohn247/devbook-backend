import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Profile from '../model/Profile';


const getProfile = async(req, res) => {
    // const { page, limit } = req.body;
    let page = req.params.page;
    let limit = req.params.limit;
    try{
        const records = await Profile.find()
        .sort({date: -1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log({records})

        const count = await Profile.find().countDocuments();
        console.log(count)
        if(!records){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        res.status(200).json({
            status:200,
            records,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
        console.log(records)
        }catch(err){
            res.status(500).json({
                status:500,
                err:'server error'
            })
        }
}
export default getProfile;
