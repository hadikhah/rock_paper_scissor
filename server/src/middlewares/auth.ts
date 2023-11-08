import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserModel } from '../models/User';
import { ErrorHandler, catchAsyncError } from './Exception';

/**
 * express request interface with user
 *
 * @export
 * @interface AuthRequest
 * @extends {Request}
 */
export interface AuthRequest extends Request {

    user?: UserModel | null

}

/**
 * jwt paylaod interface
 *
 * @interface JwtPayload
 */
interface JwtPayload {
    userId: string
}

/**
 * generates and returns a Json web Token for given user
 *
 * @param {string} userId
 * @return {*} 
 */
export const generateJwtToken = (userId: string): String => {

    return jwt.sign({ userId }, process.env.JWT_SECRET || "jwtSecret", {
        expiresIn: process.env.JWT_EXPIRES || "60d"
    })

}

/**
 *  generates a jwt token and sends user a response 
 *  that contains user profile information and
 *  jwt token and a http only cookie
 *
 * @param {UserModel} user
 * @param {number} statusCode
 * @param {Response} res
 * @return {*} 
 */
export const sendToken = (user: UserModel, statusCode: number, res: Response) => {

    const token: String = generateJwtToken(user._id)

    const JWT_COOKIE_EXPIRES: number = Number(process.env.JWT_COOKIE_EXPIRES || 60)

    res.cookie("token", token,
        {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * JWT_COOKIE_EXPIRES),
            sameSite: "none",
            secure: true,
        }
    )

    const { _id, name, email, avatar, emailVerifiedAt } = user

    return res.status(statusCode).json({ user: { _id, name, email, avatar, emailVerifiedAt }, token })

}

/**
*
*
* @param {AuthRequest} req
* @param {Response} res
* @param {NextFunction} next
*/
export const protect = catchAsyncError(async (req: AuthRequest, res: Response, next: NextFunction) => {

    const token = req.cookies.token

    if (!token)
        throw new ErrorHandler("Unauthorized", 401)

    const { userId } = await jwt.decode(token) as JwtPayload

    req.user = await User.findById(userId)

    if (!req.user)
        throw new ErrorHandler("User not found", 404)

    // TODO add roles and user status and check if user was suspended

    next()

})