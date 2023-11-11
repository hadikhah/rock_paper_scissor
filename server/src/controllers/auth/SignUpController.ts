import { Request, Response } from "express"

import User, { UserModel } from "../../models/User"

import { AuthRequest, sendToken } from './../../middlewares/auth';
import { ErrorHandler, catchAsyncError } from "../../middlewares/Exception"
import { renderTemplateEjs, sendMailHTML, sendMailTEXT } from "../../utils/mail";
import VerificationCode, { VerificationCodeModel } from "../../models/VerificationCode";

/**
* handles signup the new user
*
* @param {Request} req
* @param {Response} res
*/
export const signup = catchAsyncError(async (req: Request, res: Response) => {

    const newUser: UserModel = await User.create(req.body)

    await sendVerificationCodeEmail(newUser)

    sendToken(newUser, 201, res)

})

/**
 * sends email verification code email
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @return {*} 
 */
export const resendVerificationCodeEmail = catchAsyncError(async (req: AuthRequest, res: Response) => {

    const user = req.user

    if (!user)
        throw new ErrorHandler("User not found", 404)

    const { accepted, response } = await sendVerificationCodeEmail(user)

    return res.status(200).json({ accepted, response })

})

/**
 * creates a verificationCode and sends it to the given user
 *
 * @param {UserModel} user
 * @return {*} 
 */
const sendVerificationCodeEmail = async (user: UserModel) => {

    const verificationCode: VerificationCodeModel | null = await VerificationCode.findOneAndUpdate({ userId: user._id }, {

        userId: user._id,
        code: createRandomCode(6),
        expiresAt: new Date(Date.now() + (3 * 60 * 1000))

    }, {
        upsert: true, new: true,
    })

    const HTML: string = await renderTemplateEjs("verifyEmail", { user, verificationCode: verificationCode?.code })

    return await sendMailHTML(user.email, "Verification code", HTML)

}


/**
 *
 *
 * @param {number} [digitsCount=6]
 * @return {*}  {number}
 */
const createRandomCode = (digitsCount = 6): number => {

    return Math.floor(Math.random() * Math.pow(10, digitsCount)) // 6 digit random code

}

export const signUpFieldsValidationSchema: Object = {

    type: "object",

    properties: {
        email: { type: "string", format: "email", nullable: false },
        password: { type: "string", format: "password", nullable: false, minLength: 6 },
    },

    required: ["email", "password"],

    additionalProperties: false
} 