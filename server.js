// Importing Node modules and initializing Express
let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./Configurations/Main/Config'),
    router = require('./Configurations/Main/Router'),
    errorHandler = require('errorhandler'),
    log = require('./Configurations/Libs/Log')(module);

// Database setup
mongoose.connect(config.database);

// Start the server
if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port, function () {
        log.info(`Your server is running on port ${config.port}`);
    });
    // console.log(`Your server is running on port ${config.port}`);
} else {
    server = app.listen(config.test_port);
}

app.use(bodyParser.urlencoded({extended: false})); // Parse urlencoded body
app.use(bodyParser.json()); // Send json response
app.use(logger('dev')); // Log requests to API using morgan
app.use(errorHandler());
// Enable CORS from client-side
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

router(app);

app.use(function(req, res){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'URL [' +req.url+ '] not found!' });
});

app.use(function(err, req, res){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
});

module.exports = server;