
import dotenv from 'dotenv';
import Chat from '../model/Chat';


const chat = async (req, res) => {
    try {
        const usersChat = await Chat.find({ chatsBetween: { $all: [req.body.sender_id, req.body.receiver_id] } })
        res.status(200).json(
            usersChat
        )
        } catch (err) {
        res.status(500).json({
            status: 500,
            err: 'server error'
        })
    }

}
export default chat;