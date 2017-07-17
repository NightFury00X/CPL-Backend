let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');
const ROLE_MEMBER = require('../../Configurations/Constant/Constant').ROLE_MEMBER;
const ROLE_CLIENT = require('../../Configurations/Constant/Constant').ROLE_CLIENT;
const ROLE_OWNER = require('../../Configurations/Constant/Constant').ROLE_OWNER;
const ROLE_ADMIN = require('../../Configurations/Constant/Constant').ROLE_ADMIN;

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'User email must be unique.'],
        required: [true, 'User email is required.'],
        trim: true
    },
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required.'],
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
        default: ROLE_MEMBER
    },
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator'});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
    const user = this,
        SALT_FACTOR = 5;
    
    if (!user.isModified('password')) return next();
    
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        }
        
        cb(null, isMatch);
    });
};

let User = mongoose.model('user', UserSchema);
module.exports = User;