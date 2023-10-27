import { NextFunction, Request, Response } from "express";

/**
 * error interface with status code
 *
 * @interface Error
 */
interface Error {
    name: string;
    message: string;
    statusCode?: number
    stack?: string;
}


/**
 * catches the errors of the express middleware async callback functions
 *
 * @param {Function} theFunc
 */
export const catchAsyncError = (theFunc: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

/**
 *
 *
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    res.status(err.statusCode || 500)
        .json({
            success: false,
            name: err.name,
            message: err.message || `Internal server Error`,
            stack: process.env.NODE_ENV === "development" ? err.stack : null
        })
}

/**
 *
 *
 * @export
 * @class ErrorHandler
 * @extends {Error}
 */
export class ErrorHandler extends Error {

    statusCode: Number

    constructor(message = "", statusCode: Number) {

        super(message)

        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)

    }
}
export default errorHandler