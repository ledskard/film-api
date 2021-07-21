import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validators/SchemaValidator";

export const validateCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "o campo name é obrigatório",
        }),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .required()
            .messages({
                "string.email": "Campo com email inválido",
                "any.required": "O campo email é obrigatório",
            }),
        password: Joi.string().required().messages({
            "any.required": "O campo password é obrigatório",
        }),
        isAdmin: Joi.boolean().optional(),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
export const validateAuthenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response> => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .required()
            .messages({
                "string.email": "Campo com email inválido",
                "any.required": "O campo email é obrigatório",
            }),
        password: Joi.string().required().messages({
            "any.required": "O campo password é obrigatório",
        }),
    });
    try {
        await validateBody(req, next, schema);
    } catch (error) {
        return res.status(422).send(error);
    }
};
