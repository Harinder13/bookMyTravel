const Joi = require('joi');

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        address: Joi.string().required(),
        phone: Joi.string().min(4).required(),
        answer: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next(); // Pass control to the next middleware or controller
};

module.exports = validateUser;