import { TrainlyConfig, Citation, UploadResult, FileListResult, FileDeleteResult, BulkUploadResult, TextContent } from "../types";
interface QueryResponse {
    answer: string;
    citations?: Citation[];
}
export declare class TrainlyClient {
    private config;
    private scopedToken;
    private currentUserId;
    private isV1Mode;
    constructor(config: TrainlyConfig);
    /**
     * NEW: Connect using V1 Trusted Issuer authentication with OAuth ID token
     * This method allows users to authenticate directly with their OAuth provider tokens
     */
    connectWithOAuthToken(idToken: string): Promise<void>;
    connect(): Promise<void>;
    ask(question: string, options?: {
        includeCitations?: boolean;
        scope_filters?: Record<string, string | number | boolean>;
    }): Promise<QueryResponse>;
    upload(file: File, scopeValues?: Record<string, string | number | boolean>): Promise<UploadResult>;
    uploadText(text: string, contentName: string, scopeValues?: Record<string, string | number | boolean>): Promise<UploadResult>;
    bulkUploadFiles(files: File[], scopeValues?: Record<string, string | number | boolean>): Promise<BulkUploadResult>;
    bulkUploadText(textContents: TextContent[], scopeValues?: Record<string, string | number | boolean>): Promise<BulkUploadResult>;
    listFiles(): Promise<FileListResult>;
    deleteFile(fileId: string): Promise<FileDeleteResult>;
    private extractChatId;
    private generateAnonymousId;
}
export {};
