import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import utils from '../config/utils';

dotenv.config();

const userLogin = async (req, res) => {

    try{ 
        const {email, password} = req.body;
        let user = await User.findOne({ email });
        if(!user){
            res.status(400).json({
                status: 400,
                error: 'Incorrect Email or Password'
            })
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           res.status(404).json({
               status: 404,
               error: 'Invalid login credentials'
           })
        }
        const token = utils.encodeToken( user.id, user.email);
        res.status(200).json({
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

export default userLogin;
