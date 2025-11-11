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
var TrainlyClient = /** @class */ (function () {
    function TrainlyClient(config) {
        this.scopedToken = null;
        this.currentUserId = null;
        this.isV1Mode = false;
        this.config = config;
    }
    /**
     * NEW: Connect using V1 Trusted Issuer authentication with OAuth ID token
     * This method allows users to authenticate directly with their OAuth provider tokens
     */
    TrainlyClient.prototype.connectWithOAuthToken = function (idToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error, profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.appId) {
                            throw new Error("appId is required for V1 authentication.");
                        }
                        // For V1, we use the ID token directly - no need to provision
                        this.scopedToken = idToken;
                        this.isV1Mode = true;
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/profile"), {
                                headers: {
                                    Authorization: "Bearer ".concat(idToken),
                                    "X-App-ID": this.config.appId,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 authentication failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        profile = _a.sent();
                        this.currentUserId = profile.user_id;
                        console.log("✅ Connected to Trainly with V1 Trusted Issuer authentication");
                        console.log("\uD83D\uDCCB User ID: ".concat(profile.user_id));
                        console.log("\uD83D\uDCAC Chat ID: ".concat(profile.chat_id));
                        console.log("\uD83D\uDD12 OAuth Provider: ".concat(profile.issuer));
                        return [2 /*return*/];
                }
            });
        });
    };
    TrainlyClient.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.apiKey) {
                            // Direct API key mode - no additional setup needed
                            this.scopedToken = this.config.apiKey;
                            return [2 /*return*/];
                        }
                        if (!this.config.appSecret) {
                            throw new Error("Either appSecret or apiKey must be provided");
                        }
                        // App secret mode - provision user
                        // Ensure we use the same user ID consistently
                        if (!this.currentUserId) {
                            this.currentUserId = this.config.userId || this.generateAnonymousId();
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/privacy/apps/users/provision"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.config.appSecret),
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    end_user_id: this.currentUserId,
                                    capabilities: ["ask", "upload"],
                                }),
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("Failed to connect: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        this.scopedToken = data.scoped_token;
                        return [2 /*return*/];
                }
            });
        });
    };
    TrainlyClient.prototype.ask = function (question_1) {
        return __awaiter(this, arguments, void 0, function (question, options) {
            var params, response_1, error, data_1, url, headers, body, response, error, data;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        params = {
                            messages: JSON.stringify([{ role: "user", content: question }]),
                            response_tokens: "150",
                        };
                        // Add scope filters if provided
                        if (options.scope_filters &&
                            Object.keys(options.scope_filters).length > 0) {
                            params.scope_filters = JSON.stringify(options.scope_filters);
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/query"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: new URLSearchParams(params),
                            })];
                    case 1:
                        response_1 = _a.sent();
                        if (!!response_1.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response_1.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 query failed: ".concat(error.detail || response_1.statusText));
                    case 3: return [4 /*yield*/, response_1.json()];
                    case 4:
                        data_1 = _a.sent();
                        return [2 /*return*/, {
                                answer: data_1.answer,
                                citations: data_1.citations || [],
                            }];
                    case 5:
                        url = this.config.apiKey
                            ? "".concat(this.config.baseUrl, "/v1/").concat(this.extractChatId(), "/answer_question")
                            : "".concat(this.config.baseUrl, "/v1/privacy/query");
                        headers = {
                            "Content-Type": "application/json",
                        };
                        body = { question: question };
                        if (this.config.apiKey) {
                            headers["Authorization"] = "Bearer ".concat(this.config.apiKey);
                        }
                        else {
                            headers["x-scoped-token"] = this.scopedToken;
                            // Use the same user ID that was used during provisioning
                            body.end_user_id =
                                this.currentUserId || this.config.userId || this.generateAnonymousId();
                            body.include_citations = options.includeCitations || false;
                        }
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify(body),
                            })];
                    case 6:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 8];
                        return [4 /*yield*/, response.json()];
                    case 7:
                        error = _a.sent();
                        throw new Error("Query failed: ".concat(error.detail || response.statusText));
                    case 8: return [4 /*yield*/, response.json()];
                    case 9:
                        data = _a.sent();
                        return [2 /*return*/, {
                                answer: data.answer,
                                citations: data.citations || [],
                            }];
                }
            });
        });
    };
    TrainlyClient.prototype.upload = function (file, scopeValues) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error, data, formData, response, error, presignedResponse, error, _a, upload_url, upload_headers, formData, uploadResponse;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        formData = new FormData();
                        formData.append("file", file);
                        // Add scope values if provided
                        if (scopeValues && Object.keys(scopeValues).length > 0) {
                            formData.append("scope_values", JSON.stringify(scopeValues));
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files/upload"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                                body: formData,
                            })];
                    case 1:
                        response = _b.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _b.sent();
                        throw new Error("V1 upload failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _b.sent();
                        return [2 /*return*/, {
                                success: data.success,
                                filename: data.filename,
                                size: data.size_bytes,
                                message: data.message || "File uploaded to your permanent private subchat",
                            }];
                    case 5:
                        if (!this.config.apiKey) return [3 /*break*/, 9];
                        formData = new FormData();
                        formData.append("file", file);
                        // Add scope values if provided
                        if (scopeValues && Object.keys(scopeValues).length > 0) {
                            formData.append("scope_values", JSON.stringify(scopeValues));
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/").concat(this.extractChatId(), "/upload_file"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.config.apiKey),
                                },
                                body: formData,
                            })];
                    case 6:
                        response = _b.sent();
                        if (!!response.ok) return [3 /*break*/, 8];
                        return [4 /*yield*/, response.json()];
                    case 7:
                        error = _b.sent();
                        throw new Error("Upload failed: ".concat(error.detail || response.statusText));
                    case 8: return [2 /*return*/, {
                            success: true,
                            filename: file.name,
                            size: file.size,
                            message: "File uploaded successfully",
                        }];
                    case 9: return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/privacy/upload/presigned-url"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "x-scoped-token": this.scopedToken,
                            },
                            body: JSON.stringify({
                                end_user_id: this.currentUserId ||
                                    this.config.userId ||
                                    this.generateAnonymousId(),
                                filename: file.name,
                                file_type: file.type,
                            }),
                        })];
                    case 10:
                        presignedResponse = _b.sent();
                        if (!!presignedResponse.ok) return [3 /*break*/, 12];
                        return [4 /*yield*/, presignedResponse.json()];
                    case 11:
                        error = _b.sent();
                        throw new Error("Failed to get upload URL: ".concat(error.detail || presignedResponse.statusText));
                    case 12: return [4 /*yield*/, presignedResponse.json()];
                    case 13:
                        _a = _b.sent(), upload_url = _a.upload_url, upload_headers = _a.upload_headers;
                        formData = new FormData();
                        formData.append("file", file);
                        return [4 /*yield*/, fetch(upload_url, {
                                method: "POST",
                                body: formData,
                                headers: __assign({}, upload_headers),
                            })];
                    case 14:
                        uploadResponse = _b.sent();
                        if (!uploadResponse.ok) {
                            throw new Error("Failed to upload file");
                        }
                        return [2 /*return*/, {
                                success: true,
                                filename: file.name,
                                size: file.size,
                                message: "File uploaded to your private workspace",
                            }];
                }
            });
        });
    };
    TrainlyClient.prototype.uploadText = function (text, contentName, scopeValues) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        formData = new FormData();
                        formData.append("text_content", text);
                        formData.append("content_name", contentName);
                        // Add scope values if provided
                        if (scopeValues && Object.keys(scopeValues).length > 0) {
                            formData.append("scope_values", JSON.stringify(scopeValues));
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files/upload"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                                body: formData,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 text upload failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, {
                                success: data.success,
                                filename: data.filename,
                                size: data.size_bytes,
                                message: data.message ||
                                    "Text content uploaded to your permanent private subchat",
                            }];
                    case 5: 
                    // For non-V1 modes, text upload is not yet supported
                    throw new Error("Text upload is currently only available in V1 Trusted Issuer mode");
                }
            });
        });
    };
    TrainlyClient.prototype.bulkUploadFiles = function (files, scopeValues) {
        return __awaiter(this, void 0, void 0, function () {
            var formData_1, response, error, data, results, successful_uploads, total_size_bytes, _i, files_1, file, uploadResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!files || files.length === 0) {
                            throw new Error("No files provided for bulk upload.");
                        }
                        if (files.length > 10) {
                            throw new Error("Too many files. Maximum 10 files per bulk upload.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        formData_1 = new FormData();
                        // Append all files to the form data
                        files.forEach(function (file) {
                            formData_1.append("files", file);
                        });
                        // Add scope values if provided
                        if (scopeValues && Object.keys(scopeValues).length > 0) {
                            formData_1.append("scope_values", JSON.stringify(scopeValues));
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files/upload-bulk"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                                body: formData_1,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 bulk upload failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, {
                                success: data.success,
                                total_files: data.total_files,
                                successful_uploads: data.successful_uploads,
                                failed_uploads: data.failed_uploads,
                                total_size_bytes: data.total_size_bytes,
                                chat_id: data.chat_id,
                                user_id: data.user_id,
                                results: data.results,
                                message: data.message,
                            }];
                    case 5:
                        results = [];
                        successful_uploads = 0;
                        total_size_bytes = 0;
                        _i = 0, files_1 = files;
                        _a.label = 6;
                    case 6:
                        if (!(_i < files_1.length)) return [3 /*break*/, 11];
                        file = files_1[_i];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.upload(file, scopeValues)];
                    case 8:
                        uploadResult = _a.sent();
                        results.push({
                            filename: uploadResult.filename,
                            success: uploadResult.success,
                            error: null,
                            file_id: null, // Single upload doesn't return file_id
                            size_bytes: uploadResult.size,
                            processing_status: uploadResult.success ? "completed" : "failed",
                            message: uploadResult.message,
                        });
                        if (uploadResult.success) {
                            successful_uploads++;
                            total_size_bytes += uploadResult.size;
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        results.push({
                            filename: file.name,
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : String(error_1),
                            file_id: null,
                            size_bytes: file.size,
                            processing_status: "failed",
                        });
                        return [3 /*break*/, 10];
                    case 10:
                        _i++;
                        return [3 /*break*/, 6];
                    case 11: return [2 /*return*/, {
                            success: successful_uploads > 0,
                            total_files: files.length,
                            successful_uploads: successful_uploads,
                            failed_uploads: files.length - successful_uploads,
                            total_size_bytes: total_size_bytes,
                            chat_id: this.currentUserId || "",
                            user_id: this.currentUserId || "",
                            results: results,
                            message: "Bulk upload completed: ".concat(successful_uploads, "/").concat(files.length, " files processed successfully"),
                        }];
                }
            });
        });
    };
    TrainlyClient.prototype.bulkUploadText = function (textContents, scopeValues) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, texts, names, response, error, data, results, successful_uploads, total_size_bytes, _i, textContents_1, textContent, uploadResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!textContents || textContents.length === 0) {
                            throw new Error("No text content provided for bulk upload.");
                        }
                        if (textContents.length > 10) {
                            throw new Error("Too many items. Maximum 10 items per bulk upload.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        formData = new FormData();
                        texts = textContents.map(function (tc) { return tc.text; });
                        names = textContents.map(function (tc) { return tc.contentName; });
                        formData.append("text_contents", JSON.stringify(texts));
                        formData.append("content_names", JSON.stringify(names));
                        // Add scope values if provided
                        if (scopeValues && Object.keys(scopeValues).length > 0) {
                            formData.append("scope_values", JSON.stringify(scopeValues));
                        }
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files/upload-bulk"), {
                                method: "POST",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                                body: formData,
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 bulk text upload failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, {
                                success: data.success,
                                total_files: data.total_files,
                                successful_uploads: data.successful_uploads,
                                failed_uploads: data.failed_uploads,
                                total_size_bytes: data.total_size_bytes,
                                chat_id: data.chat_id,
                                user_id: data.user_id,
                                results: data.results,
                                message: data.message,
                            }];
                    case 5:
                        results = [];
                        successful_uploads = 0;
                        total_size_bytes = 0;
                        _i = 0, textContents_1 = textContents;
                        _a.label = 6;
                    case 6:
                        if (!(_i < textContents_1.length)) return [3 /*break*/, 11];
                        textContent = textContents_1[_i];
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.uploadText(textContent.text, textContent.contentName, scopeValues)];
                    case 8:
                        uploadResult = _a.sent();
                        results.push({
                            filename: uploadResult.filename,
                            success: uploadResult.success,
                            error: null,
                            file_id: null,
                            size_bytes: uploadResult.size,
                            processing_status: uploadResult.success ? "completed" : "failed",
                            message: uploadResult.message,
                        });
                        if (uploadResult.success) {
                            successful_uploads++;
                            total_size_bytes += uploadResult.size;
                        }
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _a.sent();
                        results.push({
                            filename: textContent.contentName,
                            success: false,
                            error: error_2 instanceof Error ? error_2.message : String(error_2),
                            file_id: null,
                            size_bytes: textContent.text.length,
                            processing_status: "failed",
                        });
                        return [3 /*break*/, 10];
                    case 10:
                        _i++;
                        return [3 /*break*/, 6];
                    case 11: return [2 /*return*/, {
                            success: successful_uploads > 0,
                            total_files: textContents.length,
                            successful_uploads: successful_uploads,
                            failed_uploads: textContents.length - successful_uploads,
                            total_size_bytes: total_size_bytes,
                            chat_id: this.currentUserId || "",
                            user_id: this.currentUserId || "",
                            results: results,
                            message: "Bulk text upload completed: ".concat(successful_uploads, "/").concat(textContents.length, " items processed successfully"),
                        }];
                }
            });
        });
    };
    TrainlyClient.prototype.listFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files"), {
                                method: "GET",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 list files failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 5: 
                    // For other modes, this functionality is not yet implemented
                    // as it requires chat-specific API endpoints
                    throw new Error("File listing is currently only available in V1 Trusted Issuer mode");
                }
            });
        });
    };
    TrainlyClient.prototype.deleteFile = function (fileId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.scopedToken) {
                            throw new Error("Not connected. Call connect() or connectWithOAuthToken() first.");
                        }
                        if (!fileId) {
                            throw new Error("File ID is required");
                        }
                        if (!(this.isV1Mode && this.config.appId)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fetch("".concat(this.config.baseUrl, "/v1/me/chats/files/").concat(encodeURIComponent(fileId)), {
                                method: "DELETE",
                                headers: {
                                    Authorization: "Bearer ".concat(this.scopedToken),
                                    "X-App-ID": this.config.appId,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        error = _a.sent();
                        throw new Error("V1 delete file failed: ".concat(error.detail || response.statusText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _a.sent();
                        return [2 /*return*/, data];
                    case 5: 
                    // For other modes, this functionality is not yet implemented
                    // as it requires chat-specific API endpoints
                    throw new Error("File deletion is currently only available in V1 Trusted Issuer mode");
                }
            });
        });
    };
    TrainlyClient.prototype.extractChatId = function () {
        if (!this.config.apiKey) {
            throw new Error("API key not provided");
        }
        // Extract chat ID from API key format: tk_chat_id_rest
        var parts = this.config.apiKey.split("_");
        if (parts.length < 3) {
            throw new Error("Invalid API key format");
        }
        return parts[1];
    };
    TrainlyClient.prototype.generateAnonymousId = function () {
        return "anon_".concat(Math.random().toString(36).substr(2, 9));
    };
    return TrainlyClient;
}());
export { TrainlyClient };
