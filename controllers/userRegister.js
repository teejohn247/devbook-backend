import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import Profile from '../model/Profile';
import utils from '../config/utils';


dotenv.config();

const userRegister = async (req, res) => {
    try{ 
        const {name, email, password} = req.body;
        console.log(req.body.name);
        console.log(email);
        console.log(password);

        let user = await User.findOne({ email });
        console.log(user);

        if(user){
            res.status(400).json({
                status: 400,
                error: 'This email address already exists'
            })
            return;
        }

        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(password, salt);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            image: "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif"
        });
        console.log(user);

        await user.save();


        let newUser = await User.findOne({ email });



        await new Profile({
            user: newUser._id,
            name: req.body.name,
            email: req.body.email,
            image: "https://clinicforspecialchildren.org/wp-content/uploads/2016/08/avatar-placeholder-480x480.gif"
        }).save();




        const token = utils.encodeToken( user.id, user.name, user.email )
        console.log(token);
        res.status(201).json({
            status: 201,
            token,
            user
          })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}

export default userRegister;
