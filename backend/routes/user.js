import express from "express";


const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.route('/verify',verifyEmail)
router.route('/me')
    .get(protect,getMe)


router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);

export default router;




