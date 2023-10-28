import { sendToken } from './../../middlewares/auth';
import { Request, Response } from "express"
import User, { UserModel } from "../../models/User"
import { catchAsyncError } from "../../middlewares/Exeption"


/**
* handles signup the new user
*
* @param {Request} req
* @param {Response} res
*/
export const signup = catchAsyncError(async (req: Request, res: Response) => {

    const newUser: UserModel = await User.create(req.body)

    sendToken(newUser, 201, res)

})

export const signUpFieldsValidationSchema: Object = {

    type: "object",

    properties: {
        email: { type: "string", format: "email", nullable: false },
        password: { type: "string", format: "password", nullable: false, minLength: 6 },
    },

    required: ["email", "password"],

    additionalProperties: false
} 