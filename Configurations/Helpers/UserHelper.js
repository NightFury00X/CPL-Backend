// Set user info from request
module.exports = {
    setUserInfo: function (request) {
        const getUserInfo = {
            _id: request._id,
            firstName: request.profile.firstName,
            lastName: request.profile.lastName,
            email: request.email,
            role: request.role
        };
        return getUserInfo;
    }
};