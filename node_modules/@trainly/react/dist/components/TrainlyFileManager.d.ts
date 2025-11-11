export interface TrainlyFileManagerProps {
    className?: string;
    onFileDeleted?: (fileId: string, filename: string) => void;
    onError?: (error: Error) => void;
    showUploadButton?: boolean;
    maxFileSize?: number;
}
export declare function TrainlyFileManager({ className, onFileDeleted, onError, showUploadButton, maxFileSize, }: TrainlyFileManagerProps): import("react/jsx-runtime").JSX.Element;
