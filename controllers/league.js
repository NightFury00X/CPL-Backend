const League = require('../models/league');

//= =======================================
// League Route
//= =======================================
exports.create = function (req, res, next) {
    // Check for errors
    const leagueName = req.body.leagueName;
    const leagueYear = req.body.leagueYear;
    
    // Return error if no league name provided
    if (!leagueName) {
        return res.status(422).send({error: 'You must enter a valid league name.'});
    }
    
    // Return error if no league year provided
    if (!leagueYear) {
        return res.status(422).send({error: 'You must enter a valid league year.'});
    }
    
    League.findOne({leagueName}, (err, existingLeague) => {
        if (err) {
            return next(err);
        }
        
        // If league is not unique, return error
        if (existingLeague) {
            return res.status(422).send({error: 'That league name is already in use.'});
        }
        // If league name is unique create league
        const league = new League();
        league.leagueName = leagueName;
        league.leagueYear = leagueYear;
        //find user
        league.user = '59634f1a1f71d3381421128a';  //User.findById(req.body.user);
        
        
        league.save((err, league) => {
            if (err) {
                return next(err);
            }
            
            //const userInfo = setUserInfo(user);
            
            
            //find all
            League.find({}, function (err, leagueData) {
                res.status(200).json({
                    status: 'Ok',
                    league: leagueData
                });
            });
        });
    });
};

exports.findById = function (req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(422).send({error: 'Unknown parameter value!'});
    }
    //find all
    League.findById(id, function (err, leagueData) {
        if (err) {
            return res.status(500).send({error: 'Something went wrong!'});
        }
        res.status(200).json({
            league: leagueData
        });
    });
}

exports.update = function (req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(422).send({error: 'Unknown parameter value!'});
    }
    //find all
    League.findById(id, function (err, leagueData) {
        if (err) {
            return res.status(500).send({error: 'Something went wrong!'});
        }
        
        leagueData.leagueName = req.body.leagueName;
        leagueData.save(function (error) {
            if (error) {
                res.send(error);
            }                    
            
            League.find({}, function (err, leagueData) {
                res.status(200).json({
                    status: 'deleted',
                    league: leagueData
                });
            });
        });
    });
}

exports.delete = function (req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(422).send({error: 'Unknown parameter value!'});
    }
    //find all
    let query = {_id: id};
    League.remove(query, function (err, leagueData) {
        if (err) {
            return res.status(500).send({error: 'Something went wrong!'});
        }
        League.find({}, function (err, leagueData) {
            res.status(200).json({
                status: 'deleted',
                league: leagueData
            });
        });
    });
}

exports.all = function (req, res, next) {
    //find all
    League.find({}, function (err, leagueData) {
        res.status(200).json({
            status: 'Ok',
            league: leagueData
        });
    });
}
