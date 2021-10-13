"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestStatusCode = exports.addLogger = void 0;
var onRequest = function (config) {
    console.info("[request] [" + JSON.stringify(config) + "]");
    return config;
};
var onRequestError = function (error) {
    console.error("[request error] [" + JSON.stringify(error) + "]");
    return Promise.reject(error);
};
var onResponse = function (response) {
    console.info("[response] [" + JSON.stringify(response.data) + "]");
    console.info(response.status);
    return response;
};
var onResponseError = function (error) {
    console.error("[response error] [" + JSON.stringify(error) + "]");
    return Promise.reject(error);
};
function addLogger(axiosInstance, log) {
    if (log) {
        axiosInstance.interceptors.request.use(onRequest, onRequestError);
        axiosInstance.interceptors.response.use(onResponse, onResponseError);
    }
    return axiosInstance;
}
exports.addLogger = addLogger;
var validateRequestStatusCode = function (status) {
    return status < 300;
};
exports.validateRequestStatusCode = validateRequestStatusCode;
