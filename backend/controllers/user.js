import { fail, success } from '../utils/apiUtils.js'

export const getMe = async(req,res,next) => {
    try {
        let user = req.user;
         res.status(200).json(success(user))
    } catch (error) {
        res.status(500).json(fail(error.message))
    }
}