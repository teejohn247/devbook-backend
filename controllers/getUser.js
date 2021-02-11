import User from '../model/User';

const getUser = async(req,res) => {
    console.log(req.payload.id)
    try{
        const user = await User.findById(req.payload.id).select('-password');
        if(!user){
            res.status(404).json({
                status:404,
                msg:'No user Found'
            })
            return
        }
        console.log(user)
        res.status(200).json(
            user
        )
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }

}
export default getUser;