import express from 'express';
import login from '../controllers/userLogin';
import register from '../controllers/userRegister';


import auth from '../middleware/auth';



const router = express.Router();

router.post('/login', login);
router.post('/signup', register);




export default router;