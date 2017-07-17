let express = require('express');
let router = express.Router();

module.exports = function (app) {
    router.use('/api', require('../Routers/AccountRoutes'));
    router.use('/api', require('../Routers/LeagueRoutes'));
    app.use(router);

    return {
        router: router
    }
};