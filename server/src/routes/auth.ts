import { Request, Response, Router } from "express";
import { signUpFieldsValidationSchema, signup } from "../controllers/auth/SignUpController";
import validator, { checkUnique } from "../middlewares/validator";
import User from "../models/User";

const router = Router();

router.get("/", (req: Request, res: Response) => {

    res.json("this is example route");

});

router.post("/signup", validator(signUpFieldsValidationSchema), checkUnique(User, "email"), signup);

export default router