"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw {
                status: 422,
                message: error.message
            };
        }
        next();
    };
};
