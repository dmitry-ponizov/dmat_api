"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.getEnvironment = void 0;
var propertiesReader = require('properties-reader');
var Env;
(function (Env) {
    Env[Env["LOCAL"] = 0] = "LOCAL";
    Env[Env["TEST"] = 1] = "TEST";
    Env[Env["Production"] = 2] = "Production";
})(Env || (Env = {}));
var getEnvironment = function (env) {
    switch (+env) {
        case Env.TEST:
            return TEST_ENVIRONMENT;
        case Env.Production:
            return PRODUCTION_ENVIRONMENT;
        default:
            return LOCAL_ENVIRONMENT;
    }
};
exports.getEnvironment = getEnvironment;
var LOCAL_ENVIRONMENT = {
    ipServiceURL: 'http://localhost:8081',
    apiBaseURL: 'http://localhost:8080'
};
var TEST_ENVIRONMENT = {
    ipServiceURL: 'http://34.141.25.42',
    apiBaseURL: 'https://dematerialised-dev.ey.r.appspot.com'
};
var PRODUCTION_ENVIRONMENT = {
    ipServiceURL: 'http://34.141.25.42',
    apiBaseURL: 'https://dematerialised-dev.ey.r.appspot.com'
};
var config = function () {
    var properties = propertiesReader('config.properties');
    var email = properties.get('email');
    var password = properties.get('password');
    var environment = properties.get('env');
    var env;
    switch (environment) {
        case 'local': {
            env = LOCAL_ENVIRONMENT;
            break;
        }
        case 'test': {
            env = TEST_ENVIRONMENT;
            break;
        }
        default: {
            throw new Error('unkown environment: ' + environment);
        }
    }
    return {
        email: email,
        password: password,
        environment: env
    };
};
exports.config = config;
