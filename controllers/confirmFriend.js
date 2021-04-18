import dotenv from 'dotenv';
import Profile from '../model/Profile';

dotenv.config();

 const confirmFriend= async(io,data) => {
  try{
    let profile = await Profile.find({user: data.receiver})
    console.log('uu', profile)
    
      Profile.findOneAndUpdate({user: data.receiver}, { $pull: {friendRequests: {user:data.sender} }},
        { unique:true, new: true },
        function(
            err,
            result
          ) {
            if (err) {
                console.log(err)
            console.log(err)
            } else {
                console.log('pull',result)
            }
          });

        Profile.findOneAndUpdate({user: data.receiver}, { $push: {friendsList: {user:data.sender, username: data.senderName, senderImage: data.senderImage, email: data.senderEmail} }},
          { unique:true, new: true },
          function(
              err,
              result
            ) {
              if (err) {
                  console.log(err)
              console.log(err)
              } else {
                  // console.log(result)
                console.log('push',result)
                  // io.sockets.emit('confirm_friend', data)
              }
            });

            Profile.findOneAndUpdate({user: data.sender}, { $push: {friendsList: {user:data.receiver, receiverImage: data.receiverImage, username: data.receiverName, } }},
              {unique:true, new: true },
              function(
                  err,
                  result
                ) {
                  if (err) {
                      console.log(err)
                  console.log(err)
                  } else {
                      // console.log(result)
                    console.log('push',result)
                      io.sockets.emit('confirm_friend', data)
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

export default confirmFriend;