
import dotenv from 'dotenv';
import Chat from '../model/Chat';


const addChat = async (io, data) => {
    try {
        const chat_ids = [data.sender_id, data.receiver_id]

        await new Chat({
            user: data.user,
            msg: data.msg,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            sender_image: data.sender_image,
            receiver_image: data.receiver_image,
            sender_name: data.sender_name,
            receiver_name: data.receiver_name,
            chatsBetween: chat_ids
        })
            .save().then(io.sockets.emit('chat', data))
      } catch (err) {
          console.log(err)
        // res.status(500).json({
        //     status: 500,
        //     err: 'server error'
        // })
    }

}
export default addChat;