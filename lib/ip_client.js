"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPClient = void 0;
var axios_1 = require("axios");
var axios_helper_1 = require("./axios_helper");
var IPClient = /** @class */ (function () {
    function IPClient(env, tokenStore, shouldLog) {
        var _this = this;
        this.env = env;
        this.tokenStore = tokenStore;
        this.shouldLog = shouldLog;
        /*
            client that requires a token
        */
        this.adminIPClient = (0, axios_helper_1.addLogger)(axios_1.default.create({
            validateStatus: axios_helper_1.validateRequestStatusCode,
            baseURL: this.env.ipServiceURL,
            headers: { 'Content-Type': 'application/json' }
        }), this.shouldLog);
        /*
            client that targets public api
        */
        this.publicIPClient = (0, axios_helper_1.addLogger)(axios_1.default.create({
            validateStatus: axios_helper_1.validateRequestStatusCode,
            baseURL: this.env.ipServiceURL,
            headers: { 'Content-Type': 'application/json' }
        }), this.shouldLog);
        /*
            adding an authorisation header with token
        */
        this.addAuthHeader = function (config) {
            var token = _this.tokenStore.getToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token.token;
            }
        };
        // set auth header
        this.adminIPClient.interceptors.request.use(function (config) {
            _this.addAuthHeader(config);
            return config;
        });
        // refresh token on expired
        this.adminIPClient.interceptors.response.use(function (response) { return response; }, function (error) {
            var originalRequest = error.config;
            var token = _this.tokenStore.getToken();
            if (error.response.status === 401 && !originalRequest._retry && token) {
                originalRequest._retry = true;
                return _this.refreshToken(token.refreshToken)
                    .then(function (response) {
                    _this.addAuthHeader(originalRequest);
                    return (0, axios_1.default)(originalRequest);
                });
            }
            return Promise.reject(error);
        });
    }
    /*
        register
    
        registers a user by providing
        email
        password
    */
    IPClient.prototype.register = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicIPClient.post('/api/v1/auth/register', {
                            email: email,
                            password: password
                        }).then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        signIn

        signs in a user by providing
        email
        password
        audiences   - the resource services that will receive the token
    */
    IPClient.prototype.signIn = function (email, password, audiences) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicIPClient.post('/api/v1/auth/token', {
                            email: email,
                            password: password,
                            audiences: audiences
                        }).then(function (response) {
                            var token = response.data;
                            _this.tokenStore.setToken(token);
                            return token;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        refreshToken
    
        refreshes the token with refreshToken when token has expired
    */
    IPClient.prototype.refreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicIPClient.post('/api/v1/auth/token/refresh', {
                            refreshToken: refreshToken,
                        }).then(function (response) {
                            var token = response.data;
                            _this.tokenStore.setToken(token);
                            return token;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        verify
    
        receives the userId, role =[admin, basic], audiences in exchange for a token
    */
    IPClient.prototype.verify = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.publicIPClient.post('/api/v1/auth/token/verify', {
                            token: token
                        }).then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /////////////////////////////////////////////////////////////////////
    //
    // Users Endpoints
    //
    /////////////////////////////////////////////////////////////////////
    /*
        setRole

        if user is admin then it can set a role of another user.
        The role must be either admin or basic
    */
    IPClient.prototype.setRole = function (userId, role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminIPClient.put('/api/v1/auth/role', {
                            userId: userId,
                            role: role
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        allUsers

        if user is admin then it can call all users
    */
    IPClient.prototype.allUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminIPClient.get('/api/v1/users').then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
        getUserById
    
        if user is admin then it can call all users
    */
    IPClient.prototype.getUserById = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminIPClient.get('/api/v1/users/' + userid).then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    IPClient.prototype.getToken = function () {
        return this.tokenStore.getToken();
    };
    return IPClient;
}());
exports.IPClient = IPClient;
