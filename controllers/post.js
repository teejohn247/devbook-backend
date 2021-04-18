  
import dotenv from 'dotenv';
// import User from '../model/User';
import Post from '../model/Post';
import Images from '../model/Images';


dotenv.config();

 const post = async(io,data) => {
     if(data.images){
      
        let post = await Post.find({file_id: data.file_id})
       
        var arr = []
        data.images.map(async(file,i) => {
            var new_obj = {};
            new_obj.file_id = data.file_id;
            new_obj.image = file;
            arr.push(new_obj);
        })

        await new Post({
            file_id: data.file_id,
            user_id:data.user_id,
            user_image: data.user_image,
            text: data.text,
            name: data.name,
            images: arr,
            email:data.email
        })
        .save().then(io.sockets.emit('post_with_images', data))
        console.log('msg emmited', post)
     }else{
        await new Post({
            file_id: data.file_id,
            user_id:data.user_id,
            user_image: data.user_image,
            text: data.text,
            name: data.name,
            email:data.email
        })
        .save().then(io.sockets.emit('post', data))
        console.log('msg emmited1', data)
    }

}
export default post;