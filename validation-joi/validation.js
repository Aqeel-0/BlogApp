
import joi from 'joi'

export const registerationSchema = joi.object({
    name: joi.string()
        .min(4)
        .max(50)
        .required(),

    email: joi.string()
        .required()
        .email(),
    password: joi.string()
        .min(8)
        .max(1000)
        .required()

})

export const loginSchema = joi.object({
    email: joi.string()
        .required()
        .email(),
    password: joi.string()
        .min(8)
        .max(1000)
        .required()
})

export const postSchema = joi.object({
    title: joi.string().required(),
    image: joi.string().required(),
    body: joi.string().required()
})
