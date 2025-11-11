export interface TrainlyUploadProps {
    variant?: "drag-drop" | "button" | "minimal";
    accept?: string;
    maxSize?: string;
    multiple?: boolean;
    className?: string;
    onUpload?: (files: File[]) => void;
    onError?: (error: string) => void;
    scopeValues?: Record<string, string | number | boolean>;
}
export declare function TrainlyUpload({ variant, accept, maxSize, multiple, className, onUpload, onError, scopeValues, }: TrainlyUploadProps): import("react/jsx-runtime").JSX.Element;
