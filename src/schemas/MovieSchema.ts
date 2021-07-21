import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/SchemaValidator";

export const validateCreateMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "o campo name é obrigatório",
        }),
        director: Joi.string().required().messages({
            "any.required": "O campo director é obrigatório",
        }),
        genre: Joi.string().required().messages({
            "any.required": "O campo genre é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
