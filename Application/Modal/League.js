let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        trim: true,
        required: [true, 'League name is required!'],
        unique: [true, 'League name must be unique!']
    },
    leagueYear: {
        type: String,
        trim: true,
        required: [true, 'League year is required!']
    }
});

LeagueSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

let League = mongoose.model('league', LeagueSchema);
module.exports = League;
