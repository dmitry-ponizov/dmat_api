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
exports.ApiClient = void 0;
var axios_1 = require("axios");
var axios_helper_1 = require("./axios_helper");
var ApiClient = /** @class */ (function () {
    function ApiClient(env, autherticator, shouldLog) {
        var _this = this;
        this.env = env;
        this.autherticator = autherticator;
        this.shouldLog = shouldLog;
        /*
             client that requires a token
         */
        this.adminApiClient = (0, axios_helper_1.addLogger)(axios_1.default.create({
            validateStatus: axios_helper_1.validateRequestStatusCode,
            baseURL: this.env.apiBaseURL,
            headers: { "Content-Type": "application/json" },
        }), this.shouldLog);
        /*
              client that targets public api
          */
        this.publicApiClient = (0, axios_helper_1.addLogger)(axios_1.default.create({
            validateStatus: axios_helper_1.validateRequestStatusCode,
            baseURL: this.env.apiBaseURL,
            headers: { "Content-Type": "application/json" },
        }), this.shouldLog);
        // set auth header
        this.adminApiClient.interceptors.request.use(function (config) {
            autherticator.addAuthHeader(config);
            return config;
        });
        // refresh token on expired
        this.adminApiClient.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            var originalRequest = error.config;
            var token = _this.autherticator.getToken();
            if (error.response.status === 401 && !originalRequest._retry && token) {
                originalRequest._retry = true;
                return _this.autherticator
                    .refreshToken(token.refreshToken)
                    .then(function (response) {
                    autherticator.addAuthHeader(originalRequest);
                    return (0, axios_1.default)(originalRequest);
                });
            }
            return Promise.reject(error);
        });
    }
    /*
          me
  
          get the user behind the token
      */
    ApiClient.prototype.me = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient.get("/api/users/me").then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          createNFT
  
          creates a NFT
       */
    ApiClient.prototype.createNFT = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient
                            .post("/api/nfts", body)
                            .then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
         updateNFT
  
         updates a NFT
      */
    ApiClient.prototype.updateNFT = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient
                            .patch("/api/nfts/" + id, body)
                            .then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          getAllNFTs
  
          lists all NFTs
       */
    ApiClient.prototype.getAllNFTs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient.get("/api/nfts").then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          getNFTById
  
          get NFT by id
       */
    ApiClient.prototype.getNFTById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient.get("/api/nfts/" + id).then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          createUCT
  
          creates an UCT
       */
    ApiClient.prototype.createUCT = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient
                            .post("/api/ucts", body)
                            .then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
         updateUCT
  
         updates an UCT
      */
    ApiClient.prototype.updateUCT = function (id, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient
                            .patch("/api/ucts/" + id, body)
                            .then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          getAllUCTs
  
          lists all UCTs
       */
    ApiClient.prototype.getAllUCTs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient.get("/api/ucts").then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          getUCTById
  
          gets ab UCT by id
       */
    ApiClient.prototype.getUCTById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient.get("/api/ucts/" + id).then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /*
          createNFT
  
          creates a NFT
  
          POST api/nfts/{itemId}/ucs
       */
    ApiClient.prototype.createUsecase = function (itemId, body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.adminApiClient
                            .post("/api/nfts/" + itemId + "/ucs", body)
                            .then(function (response) {
                            return response.data;
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ApiClient;
}());
exports.ApiClient = ApiClient;
