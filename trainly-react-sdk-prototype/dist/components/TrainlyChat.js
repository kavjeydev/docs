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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useTrainly } from "../useTrainly";
export function TrainlyChat(_a) {
    var _this = this;
    var _b = _a.height, height = _b === void 0 ? "400px" : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.placeholder, placeholder = _d === void 0 ? "Ask me anything..." : _d, _e = _a.showCitations, showCitations = _e === void 0 ? true : _e, _f = _a.enableFileUpload, enableFileUpload = _f === void 0 ? true : _f, _g = _a.theme, theme = _g === void 0 ? "auto" : _g, scopeFilters = _a.scopeFilters, onMessage = _a.onMessage, onError = _a.onError;
    var ask = useTrainly().ask;
    var _h = React.useState(""), input = _h[0], setInput = _h[1];
    var _j = React.useState([]), messages = _j[0], setMessages = _j[1];
    var _k = React.useState(false), isLoading = _k[0], setIsLoading = _k[1];
    var _l = React.useState(null), error = _l[0], setError = _l[1];
    var messagesEndRef = React.useRef(null);
    var fileInputRef = React.useRef(null);
    // Auto-scroll to bottom
    React.useEffect(function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    // Handle errors
    React.useEffect(function () {
        if (error && onError) {
            onError(error.message);
        }
    }, [error, onError]);
    var clearError = function () { return setError(null); };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var messageContent, userMessage, response, assistantMessage_1, err_1, errorMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!input.trim() || isLoading)
                        return [2 /*return*/];
                    messageContent = input.trim();
                    setInput("");
                    setError(null);
                    userMessage = {
                        id: Date.now().toString(),
                        role: "user",
                        content: messageContent,
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    onMessage === null || onMessage === void 0 ? void 0 : onMessage(userMessage);
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, ask(messageContent, {
                            includeCitations: showCitations,
                            scope_filters: scopeFilters,
                        })];
                case 2:
                    response = _a.sent();
                    assistantMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        role: "assistant",
                        content: response.answer,
                        citations: response.citations,
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [assistantMessage_1], false); });
                    onMessage === null || onMessage === void 0 ? void 0 : onMessage(assistantMessage_1);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMsg = err_1 instanceof Error ? err_1.message : "Failed to send message";
                    setError({ message: errorMsg });
                    console.error("Failed to send message:", err_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleFileUpload = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // This would trigger upload and add a system message
            // File selected for upload
        }
    };
    var baseClasses = "\n    flex flex-col border border-gray-200 rounded-lg overflow-hidden\n    ".concat(theme === "dark" ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900", "\n    ").concat(className, "\n  ");
    return (_jsxs("div", { className: baseClasses, style: { height: height }, children: [_jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (_jsx("div", { className: "text-center text-gray-500 py-8", children: _jsx("p", { children: "Start a conversation by asking a question!" }) })), messages.map(function (message) { return (_jsx("div", { className: "flex ".concat(message.role === "user" ? "justify-end" : "justify-start"), children: _jsxs("div", { className: "\n                max-w-[80%] p-3 rounded-lg\n                ".concat(message.role === "user"
                                ? "bg-blue-500 text-white rounded-br-none"
                                : "bg-gray-100 text-gray-900 rounded-bl-none", "\n              "), children: [_jsx("p", { className: "whitespace-pre-wrap", children: message.content }), showCitations &&
                                    message.citations &&
                                    message.citations.length > 0 && (_jsxs("div", { className: "mt-3 pt-3 border-t border-gray-300", children: [_jsx("p", { className: "text-xs font-semibold mb-2", children: "Sources:" }), message.citations.map(function (citation, idx) { return (_jsxs("div", { className: "text-xs bg-white bg-opacity-20 p-2 rounded mb-1", children: [_jsx("p", { className: "font-medium", children: citation.source }), _jsxs("p", { className: "opacity-75", children: ["\"", citation.snippet, "\""] })] }, idx)); })] }))] }) }, message.id)); }), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsx("div", { className: "bg-gray-100 text-gray-900 p-3 rounded-lg rounded-bl-none", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" }), _jsx("span", { children: "Thinking..." })] }) }) })), _jsx("div", { ref: messagesEndRef })] }), error && (_jsx("div", { className: "px-4 py-2 bg-red-50 border-t border-red-200 text-red-700 text-sm", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { children: error.message }), _jsx("button", { onClick: clearError, className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }) })), _jsx("div", { className: "border-t border-gray-200 p-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2", children: [enableFileUpload && (_jsxs(_Fragment, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: ".pdf,.doc,.docx,.txt,.md", onChange: handleFileUpload, className: "hidden" }), _jsx("button", { type: "button", onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg", title: "Upload file", children: "\uD83D\uDCCE" })] })), _jsx("input", { type: "text", value: input, onChange: function (e) { return setInput(e.target.value); }, placeholder: placeholder, disabled: isLoading, className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }), _jsx("button", { type: "submit", disabled: isLoading || !input.trim(), className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Send" })] }) })] }));
}
