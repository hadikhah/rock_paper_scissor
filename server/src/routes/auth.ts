import { Request, Response, Router } from "express";

import User from "../models/User";

import validator, { checkUnique } from "../middlewares/validator";
import { protect } from "../middlewares/auth";

import { resendVerificationCodeEmail, signUpFieldsValidationSchema, signup } from "../controllers/auth/SignUpController";
import { signIn, signInFieldsValidationSchema } from "../controllers/auth/SignInController";
import { checkVerificationCodeEmail, checkVerificationCodeFieldsValidationSchema } from "../controllers/auth/EmailVerificationController";

const router = Router();

router.get("/", (req: Request, res: Response) => {

    res.json("this is example route");

});

router.post("/signup", validator(signUpFieldsValidationSchema), checkUnique(User, "email"), signup);

router.post("/signin", validator(signInFieldsValidationSchema), signIn)

router.post("/resend-email-verification-code", protect, resendVerificationCodeEmail)

router.post("/check-email-verification-code", validator(checkVerificationCodeFieldsValidationSchema), protect, checkVerificationCodeEmail)

export default router