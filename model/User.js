import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
});

const User = mongoose.model("devbookusers", UserSchema);
export default User;
