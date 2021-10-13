"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryTokenStore = void 0;
var MemoryTokenStore = /** @class */ (function () {
    function MemoryTokenStore() {
    }
    MemoryTokenStore.prototype.getToken = function () {
        return this.token;
    };
    MemoryTokenStore.prototype.setToken = function (token) {
        this.token = token;
    };
    MemoryTokenStore.prototype.clearToken = function () {
        this.token = undefined;
    };
    return MemoryTokenStore;
}());
exports.MemoryTokenStore = MemoryTokenStore;
