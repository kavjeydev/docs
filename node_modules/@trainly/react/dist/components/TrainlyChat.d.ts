export interface TrainlyChatProps {
    height?: string;
    className?: string;
    placeholder?: string;
    showCitations?: boolean;
    enableFileUpload?: boolean;
    theme?: "light" | "dark" | "auto";
    scopeFilters?: Record<string, string | number | boolean>;
    onMessage?: (message: {
        role: "user" | "assistant";
        content: string;
    }) => void;
    onError?: (error: string) => void;
}
export declare function TrainlyChat({ height, className, placeholder, showCitations, enableFileUpload, theme, scopeFilters, onMessage, onError, }: TrainlyChatProps): import("react/jsx-runtime").JSX.Element;
