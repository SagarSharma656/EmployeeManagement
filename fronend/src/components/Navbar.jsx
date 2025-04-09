import React, { useState } from "react";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { VITE_BASE_URL } = import.meta.env;



export default function Navbar() {

    const [showDropdown, setShowDropdoen] = useState(false);
    const { user, setLoading } = useMyContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${VITE_BASE_URL}/auth/logout`, {}, {
                withCredentials: true,
            })

            if (res.status == 200) {
                localStorage.clear('user');
                toast.success(res?.data?.message, { duration: 2000 })
                navigate('/login');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, { duration: 2000 })
            console.log(`Error in logout : ${error?.response?.data?.message}`)
        } finally {
            setLoading(false);
        }
    }

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="relative inline-block text-left">

                <button type="button" onClick={() => setShowDropdoen(!showDropdown)} className="flex items-center focus:outline-none cursor-pointer">
                    <img
                        src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rKwDbEN_M9FCcve-ozbDkUUn6VkEZ7xfVw&s"}    
                        alt="User Profile"
                        className="rounded-full h-10 w-10"
                    />
                </button>

                {
                    showDropdown &&
                    <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-10">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-600 rounded-md">
                            Logout
                        </button>
                    </div>
                }
            </div>
        </nav>
    );
}
