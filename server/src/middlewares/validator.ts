import { NextFunction, Request, Response } from "express"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import { Model } from "mongoose"
import { ValidationError, catchAsyncError } from "./Exeption"

// TODO add ajv error messages package
// TODO check more on types to be more specific
/**
 * validates the request body using ajv and given schema
 *
 * @param {Object} schema
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*} 
 */
const validate = (schema: Object, req: Request, res: Response, next: NextFunction) => {

    const ajv = new Ajv({ allErrors: true })

    addFormats(ajv)

    const validate = ajv.compile(schema)

    if (validate(req.body)) {

        next()

    } else {

        return res.status(422).json(validate.errors)

    }
}


/**
 * validator middleware
 *
 * @param {Object} schema
 * @return {*} 
 */
const validator = (schema: Object) => {

    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        await validate(schema, req, res, next)

    })

}


/**
*
*
* @param {Model<Schema>} model
* @param {String} field
* @param {*} data
* @return {*} 
*/
export const checkUnique = (model: Model<any>, field: any,) => {

    return catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

        await isUnique(model, field, req.body[field], req, res, next)

    })
}

/**
 *
 *
 * @param {Model<Schema>} model
 * @param {String} field
 * @param {*} data
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const isUnique: any = async (model: Model<Object>, field: any, data: any, req: Request, res: Response, next: NextFunction) => {

    console.log(field, data)
    const isUnique = ! await model.findOne({ [field]: data }).lean()

    const errorMessage = `${field} is already taken`

    const ErrorObject = {
        instancePath: field,
        message: errorMessage
    }

    console.log(isUnique)

    if (!isUnique)
        throw new ValidationError(errorMessage, 422, [ErrorObject])

    next()

}



export default validator