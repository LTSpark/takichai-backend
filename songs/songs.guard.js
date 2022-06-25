const { authUser } = require("../auth/jwt-authentication");

class SongsGuard {

    create(req, res, next) {
        return [
            authUser(req, res, next)
        ];
    }

}

module.exports = new SongsGuard();