import { getUser } from '../controllers/profile/ProfileController';
import { protect } from './../middlewares/auth';
import { Router } from 'express';

const router = Router()

export const profilePrefix: string = "/user"

router.get("/profile", protect, getUser)

export default router