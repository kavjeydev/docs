import * as React from "react";
import { TrainlyContextValue } from "./types";
export interface TrainlyProviderProps {
    children: React.ReactNode;
    appSecret?: string;
    apiKey?: string;
    appId?: string;
    baseUrl?: string;
    userId?: string;
    userEmail?: string;
    getToken?: () => Promise<string | null>;
}
export declare function TrainlyProvider({ children, appSecret, apiKey, appId, // NEW: For V1 authentication
baseUrl, userId, userEmail, getToken, }: TrainlyProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTrainlyContext(): TrainlyContextValue;
