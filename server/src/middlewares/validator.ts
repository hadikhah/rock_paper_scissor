import { NextFunction, Request, Response } from "express"
import Ajv from "ajv"
import addFormats from "ajv-formats"

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

    return (req: Request, res: Response, next: NextFunction) => {

        validate(schema, req, res, next)

    }

}



export default validator