export const getMe = async(req,res,next) => {
    try {
        let user = req.user;
         res.status(200).json({
             status:"SUCCESS",
             user
         })
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error:error.message
        })
    }
}