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
var ip_client_1 = require("./ip_client");
var token_store_1 = require("./token_store");
var randomEmail = require("random-email");
var chai_1 = require("chai");
var models_1 = require("./models");
var assert = require("assert");
describe("IP Client", function () {
    var ipClient;
    var tokenStore = new token_store_1.MemoryTokenStore();
    var adminEmail = randomEmail();
    var adminPassword = "asdnajn23dfna";
    var adminUserId = "";
    beforeAll(function () {
        var env = {
            ipServiceURL: "http://localhost:8080",
            apiBaseURL: "",
        };
        ipClient = new ip_client_1.IPClient(env, tokenStore, false);
    });
    describe("register", function () {
        it("should register user", function () {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ipClient
                                .register(adminEmail, adminPassword)
                                .catch(function (e) {
                                assert.fail(e.code);
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                chai_1.expect.fail("user should not be null");
                            }
                            (0, chai_1.expect)(user.id).to.be.a("string");
                            (0, chai_1.expect)(user.email).to.equal(adminEmail);
                            // store for later
                            adminUserId = user.id;
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("signin", function () {
        it("should signin user", function () {
            return __awaiter(this, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ipClient
                                .signIn(adminEmail, adminPassword, ["audience"])
                                .catch(function (e) {
                                assert.fail(e.code);
                            })];
                        case 1:
                            token = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("verify", function () {
        it("should verify token", function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ipClient
                                .signIn(adminEmail, adminPassword, ["audience"])
                                .then(function (token) {
                                return ipClient.verify(token.token);
                            })
                                .then(function (r) {
                                (0, chai_1.expect)(r.id).to.equal(adminUserId);
                                (0, chai_1.expect)(r.role).to.equal(models_1.Role.ADMIN);
                                (0, chai_1.expect)(r.audiences).to.be.an("array").that.includes("audience");
                            }, function (e) {
                                chai_1.expect.fail(e);
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("refresh", function () {
        it("should fail expired token with 401", function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        });
        it("should refresh token", function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tokenStore.setToken(expiredToken);
                            return [4 /*yield*/, ipClient.getUserById(adminUserId).then(function (r) {
                                    (0, chai_1.expect)(r.email).to.equal(adminEmail);
                                    (0, chai_1.expect)(r.role).to.equal(models_1.Role.ADMIN);
                                }, function (e) {
                                    chai_1.expect.fail("token should be refreshed");
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("allusers", function () {
        it("should return at least one user", function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ipClient
                                .signIn(adminEmail, adminPassword, ["audience"])
                                .catch(function (e) {
                                assert.fail(e.code);
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ipClient.allUsers().then(function (r) {
                                    (0, chai_1.expect)(r.users.length).to.be.greaterThan(0);
                                }, function (e) {
                                    chai_1.expect.fail("all users should be returned");
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("getUserById", function () {
        it("should return the registered user", function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ipClient
                                .signIn(adminEmail, adminPassword, ["audience"])
                                .catch(function (e) {
                                assert.fail(e.code);
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ipClient.getUserById(adminUserId).then(function (r) {
                                    (0, chai_1.expect)(r.email).to.equal(adminEmail);
                                    (0, chai_1.expect)(r.role).to.equal(models_1.Role.ADMIN);
                                }, function (e) {
                                    chai_1.expect.fail("the registered users was not returned");
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("setRole", function () {
        it("admin should be able to change role of another user", function () {
            return __awaiter(this, void 0, void 0, function () {
                var newUserId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newUserId = "";
                            return [4 /*yield*/, ipClient
                                    .register(randomEmail(), "293e89384")
                                    .then(function (user) {
                                    newUserId = user.id;
                                })
                                    .catch(function (e) {
                                    assert.fail(e.code);
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, ipClient
                                    .signIn(adminEmail, adminPassword, ["localhost:9090"])
                                    .catch(function (e) {
                                    assert.fail(e.code);
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, ipClient.setRole(newUserId, models_1.Role.ADMIN).catch(function (e) {
                                    assert.fail(e.code);
                                })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, ipClient
                                    .getUserById(newUserId)
                                    .then(function (user) {
                                    (0, chai_1.expect)(user.id).to.equal(newUserId);
                                    (0, chai_1.expect)(user.role).to.equal(models_1.Role.ADMIN);
                                })
                                    .catch(function (e) {
                                    chai_1.expect.fail(e);
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
var expiredToken = {
    token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJhdWQiOlsiYXVkaWVuY2UiXSwicm9sZSI6ImJhc2ljIiwiZXhwIjoxNjMzMzYyNTMyLCJqdGkiOiI4OTc4OTkzZi03MmM5LTQ2YjktODM2OC1lYzQ0M2NhYWNhYmYiLCJpYXQiOjE2MzMzNjI1MTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsInN1YiI6ImJlZWJlYzA2LTBkNzQtNDY0NC05OGMyLWI0MGFlNjNmZDIxMSJ9.fIVIBAzE6M7QtnHmnqrBiji5eW_9vwgQuM8FfMz0tq73s7kxEHhfEepu3_mD1AOOcmuRTh3295QIDIAxIvjifIpmdbnDRcYBfXXfrP4TJAMk8Hu4XiyPLGyXiYvyoOre1kk7uHtbVw5jyQasEQvzJoACT_PSB0nzAuwHobR1fCmNLVBCHFn6ykV5uQdD-xcNY2YPNbSszEtx3Qt6LW0AvLvpV4UCiuqr4S-eRyuS6tfT0X6vso2mOgJZLywidSGX7UYfXoXozD0Fp6IFP3wucNCEbPLOYuo_7kwS7BOWKo6FjI324dm62avcumAqVquGJAiRmmiBaore2dRd-VQTZ22kEKVsHwsp2fVfk7jOTSoY8QYTmOMs3cDG9wk-VKVuTlKDiuFHG64pzWybB6vvgS4NX7S9MMYStJqzvsKjadkkLq6rr2uGUerotwPlYxwviHp1NWymyne7IHLBdG239t1Lei1nGe1mKe9t-yM7H4mbitdEBo-sevyT9RHfBVPhRID18-tCJFzjzjPoS4yeSlcN2pmJfFZJmgTVgjZ3L7ZTUORFI85GrBqLvQZSj50v0UCOE5dhUk11kvZsmb95vGfbXL0YeQZOiR84gNeZDXT6xnGL-hW9TPnQZ6c5RK5glgill3a2YX9C_tE52mctZ0Y1Txd6SRJqRyzImImAwnI",
    refreshToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJhdWQiOlsiYXVkaWVuY2UiXSwicm9sZSI6ImJhc2ljIiwiZXhwIjoyNjMzMzYyNTEyLCJqdGkiOiI3YTFlNWRmYi1jYmJlLTQ3YzgtYjBjNC0yOWM1NGNiZTNhMTMiLCJpYXQiOjE2MzMzNjI1MTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsInN1YiI6ImJlZWJlYzA2LTBkNzQtNDY0NC05OGMyLWI0MGFlNjNmZDIxMSJ9.TV3_pw7EWnu_6YykyRcqD5LMg_JnBD3zapOSDVvXsJ2yWLQizg_-PyQR6FSkT8JfzWtl9MgtT3Q4bW28cfTV5MJX-5TDEZ-6fSoTm1gkeRkDXJLr_3_izc1Nh3UrzAHytfvAsLD0eQPBjjNxqmIaUjx8YU57mu_7jCTgb83bEfx3B2cnb6H4ZaIWklkLLYdz09hWuheSQAlIgQegzlipZsoWtNvY_7PLhHlmQ2uQ1esJ_3v2hfekf8cpGdj5sIEaKBCx8EPUJ_L54e4u-VPKsIfPy9w40fP9gaSEKpmL2pzxemiLaK9hMHQm3ogJrBS3AUOK9w0B4cVMWXVmz9Jp6EosPQNYXRAomEZQnNyyvylDW_j41ZUlT8cnPivfOPUfLffEd1W3RGkXw4sFL0zKzzPyEedLTDkZJSKSLtWwn9EMwujWXE8yFMOFQTYtBPhLcMqeBDm1sTU7tTrTkB5PAwaPX7XzEM6KXFNM5-6cAQpstQ1RqF3vtfg0OGEmbbSBaL8Sdhw82SfY4Oq8kCCkHN9km2Q3ZDhZ6KKA5Yk075T8CA0-vlz-txmcD_Q_knyB6TwGF0pTA3Oi-mpKLvqZmysDJ_jBMNx-7W7UEvBIKBHF8DUGcMNf3SW6Vs-oBbCYGLf_Ee0Ifa0giN77w6B8MWb2vmbmhnOkAKdtIQ8hhW4",
    expiresIn: 20,
    type: "bearer",
};
