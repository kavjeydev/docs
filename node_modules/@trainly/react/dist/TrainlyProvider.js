"use client";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { TrainlyClient } from "./api/TrainlyClient";
var TrainlyContext = React.createContext(undefined);
export function TrainlyProvider(_a) {
    var _this = this;
    var children = _a.children, appSecret = _a.appSecret, apiKey = _a.apiKey, appId = _a.appId, // NEW: For V1 authentication
    _b = _a.baseUrl, // NEW: For V1 authentication
    baseUrl = _b === void 0 ? "http://localhost:8000" : _b, userId = _a.userId, userEmail = _a.userEmail, getToken = _a.getToken;
    var client = React.useState(function () {
        return new TrainlyClient({
            appSecret: appSecret,
            apiKey: apiKey,
            appId: appId, // NEW: Pass appId to client
            baseUrl: baseUrl,
            userId: userId,
            userEmail: userEmail,
        });
    })[0];
    var _c = React.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = React.useState(false), isConnected = _d[0], setIsConnected = _d[1];
    var _e = React.useState(null), error = _e[0], setError = _e[1];
    var _f = React.useState([]), messages = _f[0], setMessages = _f[1];
    var _g = React.useState(null), currentToken = _g[0], setCurrentToken = _g[1];
    var refreshIntervalRef = React.useRef(null);
    // Auto-connect on mount (only for non-OAuth modes)
    React.useEffect(function () {
        if (!appId && !getToken) {
            connect();
        }
    }, []);
    // NEW: Automatic OAuth state management
    React.useEffect(function () {
        if (!getToken || !appId)
            return;
        var manageOAuthConnection = function () { return __awaiter(_this, void 0, void 0, function () {
            var token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, getToken()];
                    case 1:
                        token = _a.sent();
                        if (!(token && token !== currentToken)) return [3 /*break*/, 4];
                        if (!(!isConnected || token !== currentToken)) return [3 /*break*/, 3];
                        console.log("🔐 New OAuth session detected, connecting to Trainly...");
                        return [4 /*yield*/, connectWithOAuthToken(token)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (!token && isConnected) {
                            // User signed out, disconnect from Trainly
                            console.log("🚪 User signed out, disconnecting from Trainly...");
                            clearRefreshInterval();
                            setIsConnected(false);
                            setCurrentToken(null);
                            setError(null);
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error("OAuth state management error:", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // Check OAuth state immediately
        manageOAuthConnection();
        // Set up periodic OAuth state checking (every 10 seconds)
        var stateCheckInterval = setInterval(manageOAuthConnection, 10000);
        return function () {
            clearInterval(stateCheckInterval);
        };
    }, [getToken, appId, currentToken, isConnected]);
    // Cleanup on unmount
    React.useEffect(function () {
        return function () {
            clearRefreshInterval();
        };
    }, []);
    var connect = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    setIsConnected(true);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    setError({
                        code: "CONNECTION_FAILED",
                        message: "Failed to connect to Trainly",
                        details: err_1,
                    });
                    setIsConnected(false);
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Clear any existing refresh interval
    var clearRefreshInterval = function () {
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
        }
    };
    // Set up automatic token refresh
    var setupTokenRefresh = function (token) {
        if (!getToken || !appId)
            return;
        // Clear any existing interval
        clearRefreshInterval();
        // Decode token to get expiration (without verification)
        try {
            var payload = JSON.parse(atob(token.split(".")[1]));
            var exp = payload.exp * 1000; // Convert to milliseconds
            var now = Date.now();
            var timeUntilExpiry = exp - now;
            // Refresh 30 seconds before expiry (or immediately if already expired)
            var refreshIn = Math.max(timeUntilExpiry - 30000, 1000);
            console.log("\uD83D\uDD04 Token refresh scheduled in ".concat(Math.round(refreshIn / 1000), " seconds"));
            refreshIntervalRef.current = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var newToken, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            console.log("🔄 Auto-refreshing token...");
                            return [4 /*yield*/, getToken()];
                        case 1:
                            newToken = _a.sent();
                            if (!(newToken && newToken !== currentToken)) return [3 /*break*/, 3];
                            return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                        case 2:
                            _a.sent();
                            setCurrentToken(newToken);
                            setupTokenRefresh(newToken); // Schedule next refresh
                            console.log("✅ Token auto-refreshed successfully");
                            _a.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error("❌ Auto token refresh failed:", error_2);
                            setIsConnected(false);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); }, refreshIn);
        }
        catch (error) {
            console.warn("Could not decode token for refresh scheduling:", error);
        }
    };
    // NEW: V1 OAuth Token connection method with auto-refresh
    var connectWithOAuthToken = function (idToken) { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.connectWithOAuthToken(idToken)];
                case 1:
                    _a.sent();
                    setCurrentToken(idToken);
                    setIsConnected(true);
                    // Set up automatic token refresh
                    setupTokenRefresh(idToken);
                    return [3 /*break*/, 4];
                case 2:
                    err_2 = _a.sent();
                    setError({
                        code: "V1_CONNECTION_FAILED",
                        message: "Failed to connect with OAuth token",
                        details: err_2,
                    });
                    setIsConnected(false);
                    throw err_2;
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var ask = function (question, options) { return __awaiter(_this, void 0, void 0, function () {
        var response, err_3, errorMessage, newToken, response, refreshError_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.ask(question, options || {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
                case 2:
                    err_3 = _a.sent();
                    errorMessage = err_3 instanceof Error ? err_3.message : String(err_3);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.ask(question, options || {})];
                case 6:
                    response = _a.sent();
                    console.log("✅ Query succeeded after token refresh");
                    return [2 /*return*/, response];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_1 = _a.sent();
                    console.error("❌ Token refresh failed:", refreshError_1);
                    return [3 /*break*/, 9];
                case 9:
                    error_3 = {
                        code: "QUERY_FAILED",
                        message: "Failed to get answer",
                        details: err_3,
                    };
                    setError(error_3);
                    throw error_3;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    // Legacy wrapper for backward compatibility (deprecated - use ask() with options instead)
    var askWithCitations = function (question) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ask(question, { includeCitations: true })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, {
                            answer: response.answer,
                            citations: response.citations || [],
                        }];
            }
        });
    }); };
    var upload = function (file, scopeValues) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_4, errorMessage, newToken, result, refreshError_2, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.upload(file, scopeValues)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _a.sent();
                    errorMessage = err_4 instanceof Error ? err_4.message : String(err_4);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during upload, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.upload(file, scopeValues)];
                case 6:
                    result = _a.sent();
                    console.log("✅ Upload succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_2 = _a.sent();
                    console.error("❌ Token refresh failed:", refreshError_2);
                    return [3 /*break*/, 9];
                case 9:
                    error_4 = {
                        code: "UPLOAD_FAILED",
                        message: "Failed to upload file",
                        details: err_4,
                    };
                    setError(error_4);
                    throw error_4;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var uploadText = function (text, contentName, scopeValues) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_5, errorMessage, newToken, result, refreshError_3, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.uploadText(text, contentName, scopeValues)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_5 = _a.sent();
                    errorMessage = err_5 instanceof Error ? err_5.message : String(err_5);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during text upload, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.uploadText(text, contentName, scopeValues)];
                case 6:
                    result = _a.sent();
                    console.log("✅ Text upload succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_3 = _a.sent();
                    console.error("❌ Token refresh failed:", refreshError_3);
                    return [3 /*break*/, 9];
                case 9:
                    error_5 = {
                        code: "TEXT_UPLOAD_FAILED",
                        message: "Failed to upload text content",
                        details: err_5,
                    };
                    setError(error_5);
                    throw error_5;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var bulkUploadFiles = function (files, scopeValues) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_6, errorMessage, newToken, result, refreshError_4, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.bulkUploadFiles(files, scopeValues)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_6 = _a.sent();
                    errorMessage = err_6 instanceof Error ? err_6.message : String(err_6);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during bulk upload, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.bulkUploadFiles(files, scopeValues)];
                case 6:
                    result = _a.sent();
                    console.log("✅ Bulk upload succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_4 = _a.sent();
                    console.error("❌ Token refresh failed during bulk upload:", refreshError_4);
                    return [3 /*break*/, 9];
                case 9:
                    error_6 = {
                        code: "BULK_UPLOAD_FAILED",
                        message: "Failed to upload files",
                        details: err_6,
                    };
                    setError(error_6);
                    throw error_6;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var bulkUploadText = function (textContents, scopeValues) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_7, errorMessage, newToken, result, refreshError_5, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.bulkUploadText(textContents, scopeValues)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_7 = _a.sent();
                    errorMessage = err_7 instanceof Error ? err_7.message : String(err_7);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during bulk text upload, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.bulkUploadText(textContents, scopeValues)];
                case 6:
                    result = _a.sent();
                    console.log("✅ Bulk text upload succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_5 = _a.sent();
                    console.error("❌ Token refresh failed during bulk text upload:", refreshError_5);
                    return [3 /*break*/, 9];
                case 9:
                    error_7 = {
                        code: "BULK_TEXT_UPLOAD_FAILED",
                        message: "Failed to upload text content",
                        details: err_7,
                    };
                    setError(error_7);
                    throw error_7;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var listFiles = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, err_8, errorMessage, newToken, result, refreshError_6, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.listFiles()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_8 = _a.sent();
                    errorMessage = err_8 instanceof Error ? err_8.message : String(err_8);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during file listing, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.listFiles()];
                case 6:
                    result = _a.sent();
                    console.log("✅ File listing succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_6 = _a.sent();
                    console.error("❌ Token refresh failed:", refreshError_6);
                    return [3 /*break*/, 9];
                case 9:
                    error_8 = {
                        code: "LIST_FILES_FAILED",
                        message: "Failed to list files",
                        details: err_8,
                    };
                    setError(error_8);
                    throw error_8;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var deleteFile = function (fileId) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_9, errorMessage, newToken, result, refreshError_7, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 11]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, client.deleteFile(fileId)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_9 = _a.sent();
                    errorMessage = err_9 instanceof Error ? err_9.message : String(err_9);
                    if (!(getToken &&
                        appId &&
                        (errorMessage.includes("401") ||
                            errorMessage.includes("authentication") ||
                            errorMessage.includes("Unauthorized")))) return [3 /*break*/, 9];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 8, , 9]);
                    console.log("🔄 Token expired during file deletion, refreshing...");
                    return [4 /*yield*/, getToken()];
                case 4:
                    newToken = _a.sent();
                    if (!newToken) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.connectWithOAuthToken(newToken)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, client.deleteFile(fileId)];
                case 6:
                    result = _a.sent();
                    console.log("✅ File deletion succeeded after token refresh");
                    return [2 /*return*/, result];
                case 7: return [3 /*break*/, 9];
                case 8:
                    refreshError_7 = _a.sent();
                    console.error("❌ Token refresh failed:", refreshError_7);
                    return [3 /*break*/, 9];
                case 9:
                    error_9 = {
                        code: "DELETE_FILE_FAILED",
                        message: "Failed to delete file",
                        details: err_9,
                    };
                    setError(error_9);
                    throw error_9;
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var sendMessage = function (content) { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, response, assistantMessage_1, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userMessage = {
                        id: Date.now().toString(),
                        role: "user",
                        content: content,
                        timestamp: new Date(),
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, askWithCitations(content)];
                case 2:
                    response = _a.sent();
                    assistantMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: response.answer,
                        timestamp: new Date(),
                        citations: response.citations,
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [assistantMessage_1], false); });
                    return [3 /*break*/, 4];
                case 3:
                    err_10 = _a.sent();
                    // Error is already set by askWithCitations
                    console.error("Failed to send message:", err_10);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var clearError = function () { return setError(null); };
    var reconnect = function () { return connect(); };
    var clearMessages = function () { return setMessages([]); };
    var value = {
        ask: ask,
        askWithCitations: askWithCitations, // Deprecated - kept for backward compatibility
        upload: upload,
        uploadText: uploadText, // NEW: Text content upload
        bulkUploadFiles: bulkUploadFiles, // NEW: Bulk file upload method
        bulkUploadText: bulkUploadText, // NEW: Bulk text content upload
        listFiles: listFiles, // NEW: File management methods
        deleteFile: deleteFile,
        connectWithOAuthToken: connectWithOAuthToken, // NEW: V1 OAuth connection method
        isLoading: isLoading,
        isConnected: isConnected,
        error: error,
        clearError: clearError,
        reconnect: reconnect,
        messages: messages,
        sendMessage: sendMessage,
        clearMessages: clearMessages,
    };
    return (_jsx(TrainlyContext.Provider, { value: value, children: children }));
}
export function useTrainlyContext() {
    var context = React.useContext(TrainlyContext);
    if (context === undefined) {
        throw new Error("useTrainlyContext must be used within a TrainlyProvider");
    }
    return context;
}
