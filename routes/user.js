import express from 'express';
import login from '../controllers/userLogin';
import register from '../controllers/userRegister';
import getUser from '../controllers/getUser';
import getProfile from '../controllers/getProfile';
import profile from '../controllers/profile';
import getUpdates from '../controllers/getUpdates';
import likes from '../controllers/likes';



import auth from '../middleware/auth';


const router = express.Router();

router.post('/login', login);
router.post('/signup', register);
router.get('/user',auth, getUser);
router.get('/profile',auth, getProfile);
router.post('/addProfile',auth, profile);
router.get('/fetchUpdates',auth, getUpdates);
router.post('/like/:post_id',auth, likes);




export default router;