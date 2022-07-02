const UsersService = require("./users.service");

class UsersController {

    async create(req, res) {      
        try {
            const { name, email, password, description } = req.body;
            const user = await UsersService.create(name, email, password, description);
            return res.status(201).json({
                user,
                msg: "User created successfully!",
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({
                error,
                msg: "User created failed!"
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await UsersService.login(email, password);
            return res.status(200).json({
                user,
                token,
                msg: "User login done successfully!",
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(error.code).json({
                ok: false,
                msg: "User login failed!",
                detail: error.message
            });
        }
    }

    getLoggedUser(req, res) {
        return res.json({
            user: req.user
        });
    }

    async getAll(req, res) {
        const users = await UsersService.getAll();
        return res.json({
            ok: true,
            users,
            totalUsers: users.length || 0
        })
    }



    async getUserById(req, res) {
        const user = await UsersService.getOne(req.params.id);
        if (!user)
            return res.json({
                ok: false,
                msg: `User with id ${req.params.id} not founded`
            });
        return res.json({
            ok: true,
            msg: `User with id ${user.id} founded`,
            user
        });
    }

    async subscribe(req, res) {
        try {
            const { id: subscriptionId } = req.query;
            const { id: userId } = req.user
            const user = await UsersService.subscribe(userId, subscriptionId);
            return res.status(200).json({
                user,
                msg: `User is now subscribed to ${subscriptionId}!`,
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(200).json({
                ok: false,
                msg: "User subscription failed!",
                detail: error.message
            });
        }
    }

    async unsubscribe(req, res) {
        try {
            const { id:  unsubscriptionId } = req.query;
            const { id: userId } = req.user
            const user = await UsersService.unsubscribe(userId, unsubscriptionId);
            return res.status(200).json({
                user,
                msg: `User is no longer subscribed to ${unsubscriptionId}!`,
                ok: true
            });
        }
        catch(error) {
            console.error(`Error: ${error.message}`);
            return res.status(error.code).json({
                ok: false,
                msg: "User unsubscription failed!",
                detail: error.message
            });
        }
    }

}

module.exports = new UsersController();