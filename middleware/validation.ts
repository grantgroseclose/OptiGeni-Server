import { Request, Response, NextFunction } from "express";
import Joi from "joi";




const validateWith = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);

    if (result.error) {
        console.log(result.error.details);
        return res.status(400).send({ error: result.error.details[0].message });
    }

    next();
};




export default validateWith;