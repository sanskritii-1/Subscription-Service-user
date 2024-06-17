import Joi from "joi";

export const registerValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    // repeat_password: Joi.ref('password'),
});


export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});
