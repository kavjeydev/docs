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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useTrainly } from "../useTrainly";
export function TrainlyUpload(_a) {
    var _this = this;
    var _b = _a.variant, variant = _b === void 0 ? "drag-drop" : _b, _c = _a.accept, accept = _c === void 0 ? ".pdf,.doc,.docx,.txt,.md" : _c, _d = _a.maxSize, maxSize = _d === void 0 ? "10MB" : _d, _e = _a.multiple, multiple = _e === void 0 ? false : _e, _f = _a.className, className = _f === void 0 ? "" : _f, onUpload = _a.onUpload, onError = _a.onError, scopeValues = _a.scopeValues;
    var _g = useTrainly(), upload = _g.upload, isLoading = _g.isLoading;
    var _h = React.useState(false), isDragOver = _h[0], setIsDragOver = _h[1];
    var fileInputRef = React.useRef(null);
    var maxSizeBytes = parseMaxSize(maxSize);
    var handleFiles = function (files) { return __awaiter(_this, void 0, void 0, function () {
        var fileArray, _i, fileArray_1, file, error, _a, fileArray_2, file, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!files)
                        return [2 /*return*/];
                    fileArray = Array.from(files);
                    // Validate files
                    for (_i = 0, fileArray_1 = fileArray; _i < fileArray_1.length; _i++) {
                        file = fileArray_1[_i];
                        if (maxSizeBytes && file.size > maxSizeBytes) {
                            error = "File \"".concat(file.name, "\" is too large. Maximum size is ").concat(maxSize, ".");
                            onError === null || onError === void 0 ? void 0 : onError(error);
                            return [2 /*return*/];
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    _a = 0, fileArray_2 = fileArray;
                    _b.label = 2;
                case 2:
                    if (!(_a < fileArray_2.length)) return [3 /*break*/, 5];
                    file = fileArray_2[_a];
                    return [4 /*yield*/, upload(file, scopeValues)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    onUpload === null || onUpload === void 0 ? void 0 : onUpload(fileArray);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    onError === null || onError === void 0 ? void 0 : onError(err_1 instanceof Error ? err_1.message : "Upload failed");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleDrop = function (e) {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };
    var handleDragOver = function (e) {
        e.preventDefault();
        setIsDragOver(true);
    };
    var handleDragLeave = function (e) {
        e.preventDefault();
        setIsDragOver(false);
    };
    var handleFileSelect = function (e) {
        handleFiles(e.target.files);
    };
    if (variant === "button") {
        return (_jsxs(_Fragment, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: accept, multiple: multiple, onChange: handleFileSelect, className: "hidden" }), _jsx("button", { onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isLoading, className: "\n            px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600\n            disabled:opacity-50 disabled:cursor-not-allowed\n            ".concat(className, "\n          "), children: isLoading ? "Uploading..." : "Upload Files" })] }));
    }
    if (variant === "minimal") {
        return (_jsxs(_Fragment, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: accept, multiple: multiple, onChange: handleFileSelect, className: "hidden" }), _jsx("button", { onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isLoading, className: "text-blue-500 hover:text-blue-600 underline ".concat(className), children: isLoading ? "Uploading..." : "Upload" })] }));
    }
    // Default: drag-drop variant
    return (_jsxs(_Fragment, { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: accept, multiple: multiple, onChange: handleFileSelect, className: "hidden" }), _jsx("div", { onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, className: "\n          border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer\n          transition-colors duration-200\n          ".concat(isDragOver ? "border-blue-500 bg-blue-50" : "hover:border-gray-400", "\n          ").concat(isLoading ? "opacity-50 cursor-not-allowed" : "", "\n          ").concat(className, "\n        "), children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-4xl", children: "\uD83D\uDCC4" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-medium text-gray-700", children: isLoading
                                        ? "Uploading..."
                                        : "Drop files here or click to upload" }), _jsxs("p", { className: "text-sm text-gray-500 mt-2", children: ["Supports: ", accept.replace(/\./g, "").toUpperCase(), " files up to", " ", maxSize] })] })] }) })] }));
}
function parseMaxSize(maxSize) {
    var match = maxSize.match(/^(\d+)\s*(GB|MB|KB)?$/i);
    if (!match)
        return null;
    var value = parseInt(match[1]);
    var unit = (match[2] || "B").toUpperCase();
    switch (unit) {
        case "GB":
            return value * 1024 * 1024 * 1024;
        case "MB":
            return value * 1024 * 1024;
        case "KB":
            return value * 1024;
        default:
            return value;
    }
}
