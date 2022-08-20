const { query, body, param } = require('express-validator');

const { authUser } = require("../auth/jwt-authentication");
const { fieldValidation } = require("../common/validators/field-validation");

class UsersGuard {

    getLoggedUser(req, res, next) {
        return [
            authUser(req, res, next)
        ];
    }

    subscribe(req, res, next) {
        return [
            authUser(req, res, next)
        ];
    }

    unsubscribe(req, res, next) {
        return [
            authUser(req, res, next)
        ];
    }

    getAll = [
        query("order").optional().isIn(["asc", "desc"]),
        query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
        query("limit", "Limit has to be a positive integer").optional().isInt({ min: 0 }),
        fieldValidation
    ];

    update = [
        authUser,
        param("id").isMongoId(),
        body("description").optional().not().isEmpty(),
        body("publicProfile").optional().isBoolean(),
        body("role").optional().isIn(["ADMIN", "USER"]),
        body("password").optional().not().isEmpty(),
        fieldValidation
    ]

    delete = [
        authUser,
        param("id").isMongoId(),
        fieldValidation
    ]

}

module.exports = new UsersGuard();