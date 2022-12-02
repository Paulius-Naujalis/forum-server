const Joi = require('joi')

module.exports = {
    loginValidate: async (req, res, next) => {
        const loginSchema = Joi.object({
            username: Joi.string().min(4).max(20).required(),
            password: Joi.string().min(5).max(30).required()
        });
        try {
            const status = await loginSchema.validateAsync(req.body, { abortEarly: false })
            if (status) {
                next()
            }
            else {
                throw new Error(`Can't validate user. Bad data credentials!`)
            }
        }
        catch (error) {
            res.send({ error: true, message: error.details[0].message })
        }
    },
    registerValidate: async (req, res, next) => {
        const registerSchema = Joi.object({
            username: Joi.string().min(4).max(20).required(),
            image: Joi.string().required(),
            email: Joi.string().min(3).max(255).required(),
            password: Joi.string().min(5).max(30).required(),
            passwordRepeat: Joi.string().min(5).max(30).required()
        })
        try {
            const validation = await registerSchema.validateAsync(req.body, { abortEarly: false });
            if (validation.password === validation.passwordRepeat) {
                next();
            } else {
                throw new Error('Invalid password!');
            }
        }
        catch (error) {
            return res.send({ error: true, message: error.message });
        }
    }
}