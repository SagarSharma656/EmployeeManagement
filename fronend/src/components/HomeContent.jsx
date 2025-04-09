import React from "react";
import { useMyContext } from "../context/MyContext";

export default function HomeContent() {

    const {user} = useMyContext();

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
            <p className="mb-2">Email: {user?.email}</p>
            <p className="mb-2">
                Here you can manage your profile and view key statistics.
            </p>
            {/* Additional details or statistics can be added here */}
        </div>
    );
}
