import { Response } from "express";

import { AuthRequest } from "../../middlewares/auth";

/**
 * returns logged in user information
 *
 * @param {AuthRequest} req
 * @param {Response} res
 */
export const getUser = (req: AuthRequest, res: Response) => {

    res.status(200).json(req.user)

}