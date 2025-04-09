import React from "react";

export default function Loader() {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 min-h-screen w-full flex items-center justify-center bg-black/50">
            <div className="w-16 h-16 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
        </div>
    );
}
