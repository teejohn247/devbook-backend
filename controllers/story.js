  
import dotenv from 'dotenv';
// import User from '../model/User';
import Story from '../model/Story';


dotenv.config();

 const story = async(io,data) => {

       const story = await Story.find();

        // await Story.createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 20 } )
      
        await new Story({
            file_id: data.file_id,
            user_id:data.user_id,
            user_image: data.user_image,
            image:data.image,
            text: data.text,
            name: data.name,
            email:data.email
        })
        .save().then(io.sockets.emit('story', data))
        console.log('msg emmited', story)
    }
export default story;