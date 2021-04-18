import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';

dotenv.config();

 const addFriend= async(io,data) => {
  try{

    console.log({data})
    let profile = await Profile.find({user: data.receiver})
    console.log('uu', profile)
    
        Profile.findOneAndUpdate({user: data.receiver}, { $push: {friendRequests: {user:data.sender, username: data.senderName, senderImage: data.senderImage, email: data.senderEmail} }},
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

                // io.sockets.emit('add_friend', data)
            }
          });

          Profile.findOneAndUpdate({user: data.sender}, { $push: {sentRequests: {user:data.receiver} }},
            { upsert: true, new: true },
            function(
                err,
                result
              ) {
                if (err) {
                    console.log(err)
                console.log(err)
                } else {
                  io.sockets.emit('add_friend', data)
                    console.log(result)
                }
              })

              // await Profile.findOneAndUpdate({user: data.sender}, { $push: {friendsList: {user:data.receiver, receiverImage: data.receiverImage, username: data.receiverName } }},
              //   { upsert: true, new: true },
              //   function(
              //       err,
              //       result
              //     ) {
              //       if (err) {
              //           console.log(err)
              //       console.log(err)
              //       } else {
              //           // console.log(result)
              //         io.sockets.emit('add_friend', data)
              //         console.log('push',result)
              //       }
              //     });
  } 
catch(err){
    console.log(err)
    // res.status(500).json({
    //     status:500,
    //      err:'server error'
    //  })
 }

    
    }

export default addFriend;