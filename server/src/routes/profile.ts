import { getUser } from '../controllers/profile/ProfileController';
import { protect } from './../middlewares/auth';
import { Router } from 'express';

const router = Router()

export const profilePrefix: string = "/api/v1/user"

router.get("/profile", protect, getUser)

export default router