"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useTrainly } from "../useTrainly";
export function TrainlyFileManager(_a) {
    var _this = this;
    var _b = _a.className, className = _b === void 0 ? "" : _b, onFileDeleted = _a.onFileDeleted, onError = _a.onError, _c = _a.showUploadButton, showUploadButton = _c === void 0 ? true : _c, _d = _a.maxFileSize, maxFileSize = _d === void 0 ? 5 : _d;
    var _e = useTrainly(), listFiles = _e.listFiles, deleteFile = _e.deleteFile, upload = _e.upload, isLoading = _e.isLoading, error = _e.error;
    var _f = React.useState([]), files = _f[0], setFiles = _f[1];
    var _g = React.useState(false), isLoadingFiles = _g[0], setIsLoadingFiles = _g[1];
    var _h = React.useState(null), isDeletingFile = _h[0], setIsDeletingFile = _h[1];
    var _j = React.useState(false), isUploading = _j[0], setIsUploading = _j[1];
    var fileInputRef = React.useRef(null);
    // Load files on component mount
    React.useEffect(function () {
        loadFiles();
    }, []);
    var loadFiles = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, err_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setIsLoadingFiles(true);
                    return [4 /*yield*/, listFiles()];
                case 1:
                    result = _a.sent();
                    setFiles(result.files);
                    return [3 /*break*/, 4];
                case 2:
                    err_1 = _a.sent();
                    error_1 = err_1 instanceof Error ? err_1 : new Error(String(err_1));
                    console.error("Failed to load files:", error_1);
                    onError === null || onError === void 0 ? void 0 : onError(error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoadingFiles(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteFile = function (fileId, filename) { return __awaiter(_this, void 0, void 0, function () {
        var result, err_2, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm("Are you sure you want to delete \"".concat(filename, "\"? This action cannot be undone."))) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsDeletingFile(fileId);
                    return [4 /*yield*/, deleteFile(fileId)];
                case 2:
                    result = _a.sent();
                    // Remove file from local state
                    setFiles(function (prev) { return prev.filter(function (f) { return f.file_id !== fileId; }); });
                    // Notify parent component
                    onFileDeleted === null || onFileDeleted === void 0 ? void 0 : onFileDeleted(fileId, filename);
                    console.log("File deleted: ".concat(result.message));
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    error_2 = err_2 instanceof Error ? err_2 : new Error(String(err_2));
                    console.error("Failed to delete file:", error_2);
                    onError === null || onError === void 0 ? void 0 : onError(error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeletingFile(null);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleFileUpload = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var file, error_3, result, err_3, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    // Check file size
                    if (file.size > maxFileSize * 1024 * 1024) {
                        error_3 = new Error("File size must be less than ".concat(maxFileSize, "MB"));
                        onError === null || onError === void 0 ? void 0 : onError(error_3);
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 5, 6, 7]);
                    setIsUploading(true);
                    return [4 /*yield*/, upload(file)];
                case 2:
                    result = _b.sent();
                    if (!result.success) return [3 /*break*/, 4];
                    // Reload files to show the new upload
                    return [4 /*yield*/, loadFiles()];
                case 3:
                    // Reload files to show the new upload
                    _b.sent();
                    console.log("File uploaded: ".concat(result.filename));
                    _b.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_3 = _b.sent();
                    error_4 = err_3 instanceof Error ? err_3 : new Error(String(err_3));
                    console.error("Failed to upload file:", error_4);
                    onError === null || onError === void 0 ? void 0 : onError(error_4);
                    return [3 /*break*/, 7];
                case 6:
                    setIsUploading(false);
                    // Clear the input
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var formatFileSize = function (bytes) {
        if (bytes === 0)
            return "0 Bytes";
        var k = 1024;
        var sizes = ["Bytes", "KB", "MB", "GB"];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };
    var formatDate = function (dateString) {
        try {
            var date = new Date(parseInt(dateString));
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
        catch (_a) {
            return dateString;
        }
    };
    var totalSize = files.reduce(function (sum, file) { return sum + file.size_bytes; }, 0);
    var styles = {
        container: {
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "16px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px",
        },
        title: {
            margin: "0 0 4px 0",
            fontSize: "18px",
            fontWeight: "600",
            color: "#1f2937",
        },
        totalSize: {
            margin: "0",
            fontSize: "14px",
            color: "#6b7280",
        },
        uploadButton: {
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        uploadButtonDisabled: {
            backgroundColor: "#9ca3af",
            cursor: "not-allowed",
        },
        error: {
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
            fontSize: "14px",
        },
        loading: {
            textAlign: "center",
            padding: "32px",
            color: "#6b7280",
            fontSize: "14px",
        },
        emptyState: {
            textAlign: "center",
            padding: "32px",
            color: "#6b7280",
        },
        emptyStateText: {
            margin: "0 0 8px 0",
            fontSize: "14px",
        },
        fileItem: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            border: "1px solid #f3f4f6",
            borderRadius: "6px",
            backgroundColor: "#f9fafb",
            marginBottom: "8px",
            transition: "background-color 0.2s",
        },
        fileName: {
            fontWeight: "500",
            color: "#1f2937",
            fontSize: "14px",
            marginBottom: "4px",
        },
        fileMeta: {
            fontSize: "12px",
            color: "#6b7280",
        },
        deleteButton: {
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        deleteButtonDisabled: {
            backgroundColor: "#9ca3af",
            cursor: "not-allowed",
        },
    };
    return (_jsxs("div", { className: className, style: styles.container, children: [_jsxs("div", { style: styles.header, children: [_jsxs("div", { children: [_jsxs("h3", { style: styles.title, children: ["Your Files (", files.length, ")"] }), _jsxs("p", { style: styles.totalSize, children: ["Total: ", formatFileSize(totalSize)] })] }), showUploadButton && (_jsxs("div", { children: [_jsx("input", { ref: fileInputRef, type: "file", onChange: handleFileUpload, disabled: isUploading || isLoading, accept: ".pdf,.docx,.txt,.md,.csv,.json,.html,.xml,.yaml,.yml,.js,.py,.java,.cpp,.c,.h,.cs,.php,.rb,.sh,.bat,.ps1", style: { display: "none" } }), _jsx("button", { onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: isUploading || isLoading, style: __assign(__assign({}, styles.uploadButton), (isUploading || isLoading
                                    ? styles.uploadButtonDisabled
                                    : {})), children: isUploading ? "Uploading..." : "Upload File" })] }))] }), error && _jsx("div", { style: styles.error, children: error.message }), isLoadingFiles ? (_jsx("div", { style: styles.loading, children: "Loading files..." })) : files.length === 0 ? (_jsxs("div", { style: styles.emptyState, children: [_jsx("p", { style: styles.emptyStateText, children: "No files uploaded yet." }), showUploadButton && (_jsx("p", { style: styles.emptyStateText, children: "Click \"Upload File\" to add your first document." }))] })) : (_jsx("div", { children: files.map(function (file) { return (_jsxs("div", { style: styles.fileItem, onMouseEnter: function (e) {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                    }, onMouseLeave: function (e) {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                    }, children: [_jsxs("div", { children: [_jsx("div", { style: styles.fileName, children: file.filename }), _jsxs("div", { style: styles.fileMeta, children: [formatFileSize(file.size_bytes), " \u2022 ", file.chunk_count, " chunks \u2022 ", formatDate(file.upload_date)] })] }), _jsx("div", { children: _jsx("button", { onClick: function () { return handleDeleteFile(file.file_id, file.filename); }, disabled: isDeletingFile === file.file_id || isLoading, style: __assign(__assign({}, styles.deleteButton), (isDeletingFile === file.file_id || isLoading
                                    ? styles.deleteButtonDisabled
                                    : {})), onMouseEnter: function (e) {
                                    if (!e.currentTarget.disabled) {
                                        e.currentTarget.style.backgroundColor = "#b91c1c";
                                    }
                                }, onMouseLeave: function (e) {
                                    if (!e.currentTarget.disabled) {
                                        e.currentTarget.style.backgroundColor = "#dc2626";
                                    }
                                }, children: isDeletingFile === file.file_id ? "Deleting..." : "Delete" }) })] }, file.file_id)); }) }))] }));
}
