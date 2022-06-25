const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    description: {
        type: String
    },
    subscribers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    subscriptions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    songs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Songs'
        }
    ],
    favouriteSongs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Songs'
        }
    ]
}, {
    timestamps: true
});


UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.userId = _id;
    return user;
}

module.exports = model('User', UserSchema);