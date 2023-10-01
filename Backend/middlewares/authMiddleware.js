import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler( async (req,res,next) => {
    let token;
    token = req.cookies.jwt

    if (token){
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode) 
            req.user = await User.findById(decode.userId).select('-password')
            console.log(String(req.user._id))

            next();
        } catch {
            res.status(401)
            throw new Error('unauthorised. invalid token')
        }

    } else {
        res.status(401)
        throw new Error('unauthorised. no token')
    }
    
})

export {
    protect
}