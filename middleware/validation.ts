import { Request, Response, NextFunction } from "express";
import { z } from 'zod';




const validateWith = (schema: z.ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(error);
        } else {
            console.error("Unexpected API error");
        }

        return res.status(400).send({ error: error });
    }

    next();
};




export default validateWith;