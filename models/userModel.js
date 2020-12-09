const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User must have an email'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Wrong email format'],
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        trim: true,
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'User must have a password confirmation'],
        trim: true,
        minLength: 8,
        validate: {
            // Only works on create and save
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same',
        },
    },
    passwordChanged: Date,
    photo: {
        type: String,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChanged) {
        const changedTimestamp = parseInt(
            this.passwordChanged.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
