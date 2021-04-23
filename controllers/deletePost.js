import dotenv from 'dotenv';
import Post from '../model/Post';

const deletePost = async(io,data) => {
    try{
        console.log(data.file_id);
        await Post.deleteOne({ file_id: data.file_id });
        io.sockets.emit('delete_post', data);
        // res.status(200).json({
        //     status:200,
        //     msg:'Post Deleted'
        // })
    }catch(err){
        console.log(err)
        // res.status(500).json({
        //     status:500,
        //     err:'server error'
        // })
    }
}
export default deletePost;