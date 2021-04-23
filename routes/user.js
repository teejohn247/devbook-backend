import express from 'express';
import login from '../controllers/userLogin';
import register from '../controllers/userRegister';
import getUser from '../controllers/getUser';
import getProfile from '../controllers/getProfile';
import profile from '../controllers/profile';
import getUpdates from '../controllers/getUpdates';
import comments from '../controllers/comments';
import editProfile from '../controllers/editProfile';
import getSpecific from '../controllers/getSpecific';
import getStory from '../controllers/getStory';
import chat from '../controllers/chat';
import getProfiles from '../controllers/getProfiles';






import likes from '../controllers/likes';



import auth from '../middleware/auth';
import allProfiles from '../controllers/allProfiles';
import getNotification from '../controllers/getNotifications';
import deletePost from '../controllers/deletePost';


const router = express.Router();

router.post('/login', login);
router.post('/signup', register);
router.get('/user',auth, getUser);
router.get('/profile',auth, getProfile);
router.post('/addProfile',auth, profile);
router.get('/story',auth, getStory);
router.get('/fetchUpdates',auth, getUpdates);
router.post('/like/:post_id',auth, likes);
router.post('/comment/:id',auth, comments);
router.patch('/editProfile',auth, editProfile);
router.post('/fetchChats',auth, chat);
router.get('/profile/:id',auth, getSpecific);
router.get('/allprofiles',auth, allProfiles);
router.get('/getProfiles',auth, getProfiles);
router.delete('/del/post/:id',auth, deletePost);
router.get('/notifications/:time/:page/:limit',auth, getNotification);











export default router;