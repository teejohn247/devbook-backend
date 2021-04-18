  
import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';



const online = async(io,onlineIds, userId) => {
    try{
        const profile = await Profile.findOne({ user: userId });
        // console.log({profile})
        const frnds = []

        profile.friendsList.map((frnd,i) => {
            console.log('vcv',frnd.user)
            frnds.push(frnd.user)
        })

        console.log({frnds})

        let chk = onlineIds.some((online,i) => frnds.includes(online))

        console.log({chk})


      if(chk){
      const onlineUsers = await User.find({_id: {$in: onlineIds}}).select('-password')
      console.log({onlineUsers})
      io.sockets.emit('online_users', onlineUsers)
      }else{
          return 
      }
    }catch(err){
        console.log(err)
        // res.status(500).json({
        //     status:500,
        //     err:'server error'
        // })
    }

}
export default online;