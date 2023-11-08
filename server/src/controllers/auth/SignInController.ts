import { Response } from "express";

import User from "../../models/User";
import { ErrorHandler, catchAsyncError } from "../../middlewares/Exception";
import { AuthRequest, sendToken } from "../../middlewares/auth";
import { compare } from "bcryptjs";

/**
 * sign in attempt handler check user credentials and returns errors
 *
 * @param {AuthRequest} req
 * @param {Response} res
 */
export const signIn = catchAsyncError(async (req: AuthRequest, res: Response) => {

    const user = await User.findOne({ "email": req.body.email }).select("+password")

    if (!user)
        throw throwIncorrectLoginCredentialsError()

    const isCorrectPassword = await compare(req.body.password, user.password)

    if (!isCorrectPassword)
        throw throwIncorrectLoginCredentialsError()


    sendToken(user, 201, res)

})


const throwIncorrectLoginCredentialsError = () => {

    return new ErrorHandler("Incorrect Email or password", 401)

}

export const signInFieldsValidationSchema: Object = {

    type: "object",

    properties: {
        email: { type: "string", format: "email", nullable: false },
        password: { type: "string", format: "password", nullable: false, minLength: 6 },
    },

    required: ["email", "password"],

    additionalProperties: false
} 