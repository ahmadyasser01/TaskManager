import express from "express";


const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.psot('/verify',verifyEmail)
router.get('/verify:token',verifyEmail)

router.route('/me')
    .get(protect,getMe)


router.post('/forgotPassword',forgotPassword);
router.patch('/resetPassword/:token',resetPassword);

export default router;




