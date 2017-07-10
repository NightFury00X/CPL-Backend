const League = require('../models/league');
const User = require('../models/user');

//= =======================================
// League Route
//= =======================================
exports.create = function (req, res, next) {
    // Check for registration errors
    const leagueName = req.body.leagueName;
    const user = User.findById(req.body.user);
    console.log("User: ", user);
    // Return error if no league name provided
    if (!leagueName) {
        return res.status(422).send({error: 'You must enter a valid league name.'});
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
        const league = new League({
            leagueName,
            user
        });
        
        
        league.save((err, league) => {
            if (err) {
                return next(err);
            }
            
            //const userInfo = setUserInfo(user);
            
            res.status(200).json({
                token: 'token',
                league: league
            });
        });
    });
};
