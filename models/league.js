// Importing Node packages required for schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//= ===============================
// League Schema
//= ===============================

const LeagueSchema = new Schema({
        leagueName: {
            type: String,
            lowercase: false,
            unique: true,
            required: true
        },
        leagueYear: {
            type: String,
            lowercase: false,
            unique: false,
            required: true
        },
        user: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    {
        timestamps: true
    });

//= ===============================
// League ORM Methods
//= ===============================

module.exports = mongoose.model('League', LeagueSchema);

