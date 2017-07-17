domain = require('../../../Configurations/Domains/DomainInclude');
responseHelper = require('../../../Configurations/Helpers/ResponseHelper');

exports.getList = function (req, res) {
    domain.League.find({}, (err, results) => {
        if (err) {
            responseHelper.setErrorResponse(err, res);
        }
        responseHelper.setSuccessResponse(results, res);
    });
};

exports.createLeague = function (req, res) {
    let leagueData = domain.League({
        leagueName: req.body.leagueName,
        leagueYear: req.body.leagueYear
    });
    
    leagueData.save((err, record) => {
        if (err) {
            responseHelper.setErrorResponse(err.message, res);
        } else {
            responseHelper.setSuccessResponse(record, res);
        }
    });
};

exports.getLeagueById = function (req, res, callback) {
    
};