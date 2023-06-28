import express from 'express'
import { authUser,registerUser,logoutUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router()

router.post("/", registerUser);
router.post('/login',authUser)
router.post('/logout',logoutUser)
router.route('/Profile').get(protect,getUserProfile).put(protect,updateUserProfile)

export default router