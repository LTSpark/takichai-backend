const { query, param, body } = require('express-validator');

const { authUser } = require("../auth/jwt-authentication");
const { fieldValidation } = require("../common/validators/field-validation");

class SongsGuard {

    create = [
        authUser
    ] 

    getSongById = [
        param("id").isMongoId(),
        fieldValidation
    ]

    addFavourite = [
        authUser,
        param("id").isMongoId(),
        fieldValidation
    ]

    getAll = [
        query("order").optional().isIn(["asc", "desc"]),
        query("from", "From has to be a positive integer").optional().isInt({ min: 0 }),
        query("limit", "Limit has to be a positive integer").optional().isInt({ min: 0 }),
        fieldValidation
    ];

}

module.exports = new SongsGuard();