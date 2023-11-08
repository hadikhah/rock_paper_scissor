import { Request, Response, Router } from "express";

import User from "../models/User";
import validator, { checkUnique } from "../middlewares/validator";
import { signUpFieldsValidationSchema, signup } from "../controllers/auth/SignUpController";
import { signIn, signInFieldsValidationSchema } from "../controllers/auth/SignInController";

const router = Router();

router.get("/", (req: Request, res: Response) => {

    res.json("this is example route");

});

router.post("/signup", validator(signUpFieldsValidationSchema), checkUnique(User, "email"), signup);

router.post("/signin", validator(signInFieldsValidationSchema), signIn)

export default router