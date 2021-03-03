import dotenv from 'dotenv';
import User from '../model/User';
import Post from '../model/Post';

dotenv.config();

const post = async (io, data) => {
    try {
        let post = await Post.find({ file_id: Number(data.file_id) })
        console.log('uu', post[0].comments.some(comment => comment.comment_id == data.comment_id))
        console.log('dd', post[0].comments.filter(comment => comment.comment_id == data.comment_id))
        console.log('qq', post[0].comments.some(comment => comment.comment_id == data.comment_id ? comment.commentLikes.some(like => like.user === data.name) : false))

        post[0].comments.some(comment => comment.comment_id == data.comment_id ? comment.commentLikes.some(like => like.user === data.name) : false) ?
            Post.findOneAndUpdate({ file_id: Number(data.file_id), "comments.comment_id": data.comment_id }, { $pull: { "comments.$.commentLikes": { user: data.name } } },
                { upsert: true, new: true },
                function (
                    err,
                    result
                ) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log({ result })
                        io.sockets.emit('comment_like', data)
                    }
                })
            :
            Post.findOneAndUpdate({ file_id: Number(data.file_id), "comments.comment_id": data.comment_id }, { $push: { "comments.$.commentLikes": { user: data.name } } },
                { upsert: true, new: true },
                function (
                    err,
                    result
                ) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('result', result.comment)
                        io.sockets.emit('comment_like', data)


                    }
                })
    }
    catch (err) {
        console.log(err)
    }


}

export default post;