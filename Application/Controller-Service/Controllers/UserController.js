domain = require('../../../Configurations/Domains/DomainInclude');
responseHelper = require('../../../Configurations/Helpers/ResponseHelper');

exports.getList = function (req, res) {
    domain.User.find({}, {__v: false, password: false}, (err, results) => {
        if (err) {
            responseHelper.setErrorResponse(err, res);
        }
        responseHelper.setSuccessResponse(results, res);
    });
};

