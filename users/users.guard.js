const { authUser } = require("../auth/jwt-authentication");

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

}

module.exports = new UsersGuard();