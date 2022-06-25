const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../schemas/user.schema');
const { errorFactory } = require("../common/exception.factory");

class UsersService {

    create(name, email, password, description="") {
        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            description
        });
        return user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ email }).exec();
        if(!user) {
            throw errorFactory(`User with email ${email} not found`, 401);
        }
        if(!bcrypt.compareSync(password, user.password)){
            throw errorFactory("Invalid password", 401);
        }
        const token = jwt.sign({ id: user.id }, process.env.KEY, { expiresIn: '2h', algorithm: 'HS256' });
        return { user, token };
    }

    async getAll() {
        return await User.find({}).exec();
    }

    async getOne(id) {
        return await User.findById(id).exec();
    }

    async getByEmail() {
        return await User.find({email}).exec();
    }

    async subscribe(id, subscriptionId) {
        await User.findByIdAndUpdate(subscriptionId, {
            $addToSet: {
                subscribers: id
            }
        }).exec();
        return await User.findByIdAndUpdate(id, {
            $addToSet: {
                subscriptions: subscriptionId
            }
        }, { new: true }).exec();
    }

    async unsubscribe(id, unsubscriptionId) {        
        await User.findByIdAndUpdate(unsubscriptionId, {
            $pull: {
                subscribers: id
            }
        }).exec();
        return await User.findByIdAndUpdate(id, {
            $pull: {
                subscriptions: unsubscriptionId
            }
        }, { new: true }).exec();
    }

}

module.exports = new UsersService();