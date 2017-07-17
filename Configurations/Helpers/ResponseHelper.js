log = require('../Libs/Log')(module);

module.exports = {
    setSuccessResponse: function (data, res) {
        let response = {
            "success": true,
            data: data,
            "error": []
        };
        log.info("Successfull");
        this.setResponse(200, response, res);
    },
    setErrorResponse: function (errors, res) {
        let response = {
            "success": false,
            data: [],
            "error": errors
        };
        log.error('Internal error(%d): %s',res.statusCode, errors);
        this.setResponse(500, response, res);
    },
    setResponse: function (status, response, res) {
        res.status(status).json(response);
        res.end();
    }
};