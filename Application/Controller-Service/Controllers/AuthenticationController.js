const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../../Configurations/Main/Config');
domain = require('../../../Configurations/Domains/DomainInclude');
responseHelper = require('../../../Configurations/Helpers/ResponseHelper');
const userHelper = require('../../../Configurations/Helpers/UserHelper');

// Generate JWT
function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 // in seconds
    });
}

// Login
exports.login = function (req, res) {
    console.log('Ok');
    const userInfo = userHelper.setUserInfo(req.user);
    res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
    });
};

// Register user
exports.register = function (req, res) {
    if(!req.body.profile.firstName){
        responseHelper.setErrorResponse('Please enter first name.', res);
    }
    if(!req.body.profile.lastName){
        responseHelper.setErrorResponse('Please enter last name.', res);
    }
    let accountData = domain.User({
        email: req.body.email,
        profile: {
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName
        },
        password: req.body.password,
        role: req.body.role
    });
    
    accountData.save((err, record) => {
        if (err) {
            res.status(500);
            responseHelper.setErrorResponse(err.message, res);
        } else {
            const accountInfo = userHelper.setUserInfo(record);
            responseHelper.setSuccessResponse({
                token: `JWT ${generateToken(accountInfo)}`,
                user: accountInfo
            }, res);
        }
    });
};

