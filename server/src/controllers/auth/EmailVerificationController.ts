import { Response } from "express";
import { ErrorHandler, ValidationError, catchAsyncError } from "../../middlewares/Exception";
import { AuthRequest } from "../../middlewares/auth";
import VerificationCode, { VerificationCodeInterface } from "../../models/VerificationCode";
import User, { UserInterface } from "../../models/User";

/**
 *  checks if the verification code is valid and verifies the user email
 *
 * @param {AuthRequest} req
 * @param {Response} res
 * @return {*} 
 */
export const checkVerificationCodeEmail = catchAsyncError(async (req: AuthRequest, res: Response) => {

    //checks if user is already verified
    if (req.user?.emailVerifiedAt)
        throw new ErrorHandler("email is already verified", 405)

    const verificationCode: VerificationCodeInterface | null = await VerificationCode.findOne({ userId: req.user?._id }).lean()

    //check if verification code is expired
    if (isCodeExpired(verificationCode?.expiresAt))
        throw new ValidationError("verification code has been expired", 400, [{ code: "expired verification code" }])

    //throws validation Error if verification code is not valid
    if (!isCodeValid(req.body.code, verificationCode?.code))
        throw new ValidationError("verification code is invalid", 401, [{ code: "Invalid verification code" }])

    // adds the emailVerifiedAt field with the value of now
    const user: UserInterface | null = await User.findOneAndUpdate({ _id: req.user?._id }, { emailVerifiedAt: new Date().toISOString() }, { new: true })


    return res.status(200).json({ success: true, message: "email successfully verified", user })

})

/**
 * check if given codes match
 *
 * @param {(number | undefined)} firstCode
 * @param {(number | undefined)} secondCode
 * @return {*}  {boolean}
 */
const isCodeValid = (firstCode: number | undefined, secondCode: number | undefined): boolean => {


    if (firstCode === undefined || secondCode === undefined)
        return false

    return firstCode === secondCode

}

/**
 * checks if the given date has passed
 *
 * @param {(Date | undefined)} expiresAt
 * @return {*}  {boolean}
 */
const isCodeExpired = (expiresAt: Date | undefined): boolean => {

    if (expiresAt === undefined)
        return true

    return new Date(Date.now()) > new Date(expiresAt)
}

/**
 * verification code request validation schema
 * 
 *  @type {*} */
export const checkVerificationCodeFieldsValidationSchema: Object = {

    type: "object",

    properties: {
        code: { type: "number", nullable: false, minLength: 6, maxLength: 6 },
    },

    required: ["code"],

    additionalProperties: false
}