import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';

dotenv.config();

 const rejectFriend= async(io,data) => {
  try{
    let profile = await Profile.find({user: Number(data.reciever)})
    console.log('uu', profile)
    
        Profile.findOneAndUpdate({user: Number(data.reciever)}, { $pull: {friendRequests: {user:data.sender} }},
        { upsert: true, new: true },
        function(
            err,
            result
          ) {
            if (err) {
                console.log(err)
            console.log(err)
            } else {
                console.log(result)
                io.sockets.emit('reject_friend', data)
            }
          });
         } 
            catch(err){
                console.log(err)
                // res.status(500).json({
                //     status:500,
                //      err:'server error'
                //  })
            }

    }

export default rejectFriend;