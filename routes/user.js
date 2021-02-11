import express from 'express';
import login from '../controllers/userLogin';
import register from '../controllers/userRegister';
import getUser from '../controllers/getUser';
import getProfile from '../controllers/getProfile';
import profile from '../controllers/profile';



import auth from '../middleware/auth';



const router = express.Router();

router.post('/login', login);
router.post('/signup', register);
router.get('/user',auth, getUser);
router.get('/profile',auth, getProfile);
router.post('/addProfile',auth, profile);





export default router;