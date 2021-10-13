"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestClients = void 0;
var ip_client_1 = require("./ip_client");
var token_store_1 = require("./token_store");
var api_client_1 = require("./api_client");
var createTestClients = function (env, shouldLog) {
    var ipClient = new ip_client_1.IPClient(env, new token_store_1.MemoryTokenStore(), shouldLog);
    var apiClient = new api_client_1.ApiClient(env, ipClient, shouldLog);
    return [apiClient, ipClient];
};
exports.createTestClients = createTestClients;
