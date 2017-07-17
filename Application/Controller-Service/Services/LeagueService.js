let BaseService = require('./BaseService');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let LeagueService = function () {
};

// LeagueService.prototype = new BaseService();

LeagueService.prototype.fetchLeagues = function (data, callback) {
    let getAllLeagues = function (data) {
        return new Promise(function (resolve, reject) {
            domain.League.find({}, function (error, records) {
                if (error) {
                    reject({text: 'No record found.', Error: error});
                } else {
                    console.log('ok');
                    resolve(records);
                }
            });
        });
    };
    
    getAllLeagues().then(function (result) {
        callback.json(result);
    }).catch(function (error) {
        callback.json(error);
    });
};

LeagueService.prototype.createLeague = function (data, callback) {
    let leagueData = new domain.League({
        leagueName: data.leagueName,
        leagueYear: data.leagueYear
    });
    let createLeague = function (data) {
        return new Promise(function (resolve, reject) {
            console.log('Ok');
            leagueData.save(function (error, records) {
                if (error) {
                    reject({text: "Error", error: error});
                } else {
                    resolve(records);
                }
            });
        });
    };
    createLeague().then(function (result) {
        callback.json(result);
    }).catch(function (error) {
        callback.json(error);
    });
};

module.exports = LeagueService;