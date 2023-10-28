import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

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

    const token = generateJwtToken(user._id)

    const JWT_COOKIE_EXPIRES: number = Number(process.env.JWT_COOKIE_EXPIRES || 60)

    res.cookie("token", token,
        {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * JWT_COOKIE_EXPIRES),
            sameSite: "none",
            secure: true,
        }
    )

    return res.status(201).json({ user: { user }, token })

}