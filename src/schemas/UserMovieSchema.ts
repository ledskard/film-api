import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/SchemaValidator";

export const validateCreateUserMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        user: Joi.string().required().messages({
            "any.required": "o campo user é obrigatório",
        }),
        movie: Joi.string().required().messages({
            "any.required": "o campo movie é obrigatório",
        }),
        note: Joi.number().valid(0,1,2,3,4).required().messages({
            "any.required": "O campo note é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
