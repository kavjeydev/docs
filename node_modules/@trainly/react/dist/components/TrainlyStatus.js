"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTrainly } from "../useTrainly";
export function TrainlyStatus(_a) {
    var _b = _a.showDetails, showDetails = _b === void 0 ? true : _b, _c = _a.position, position = _c === void 0 ? "inline" : _c, _d = _a.className, className = _d === void 0 ? "" : _d;
    var _e = useTrainly(), isConnected = _e.isConnected, isLoading = _e.isLoading, error = _e.error;
    var getStatusInfo = function () {
        if (error) {
            return {
                icon: "❌",
                text: "Connection failed",
                color: "text-red-600 bg-red-50 border-red-200",
                details: error.message,
            };
        }
        if (isLoading) {
            return {
                icon: "🔄",
                text: "Connecting...",
                color: "text-yellow-600 bg-yellow-50 border-yellow-200",
                details: "Establishing connection to Trainly",
            };
        }
        if (isConnected) {
            return {
                icon: "✅",
                text: "Connected",
                color: "text-green-600 bg-green-50 border-green-200",
                details: "Ready to answer questions",
            };
        }
        return {
            icon: "⚠️",
            text: "Disconnected",
            color: "text-gray-600 bg-gray-50 border-gray-200",
            details: "Not connected to Trainly",
        };
    };
    var status = getStatusInfo();
    var positionClasses = {
        "top-left": "fixed top-4 left-4 z-50",
        "top-right": "fixed top-4 right-4 z-50",
        "bottom-left": "fixed bottom-4 left-4 z-50",
        "bottom-right": "fixed bottom-4 right-4 z-50",
        inline: "",
    };
    var baseClasses = "\n    inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium\n    ".concat(status.color, "\n    ").concat(positionClasses[position], "\n    ").concat(className, "\n  ");
    return (_jsxs("div", { className: baseClasses, children: [_jsx("span", { className: status.icon === "🔄" ? "animate-spin" : "", children: status.icon }), _jsx("span", { children: status.text }), showDetails && status.details && (_jsxs("span", { className: "text-xs opacity-75 ml-1", children: ["- ", status.details] }))] }));
}
