import axios from "axios";
import React, { useState } from "react";
import { useMyContext } from "../context/MyContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { VITE_BASE_URL } = import.meta.env;

export default function LoginPage() {

    const {loading, setLoading} = useMyContext();
    const [formData, setFormData] = useState({email: "", password: ""});
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${VITE_BASE_URL}/auth/login`, { ...formData }, {
                withCredentials: true,
            });

            // console.log(res, "res from login api")
            if(res.status === 200){
                toast.success(res?.data?.message)
                localStorage.setItem('user', JSON.stringify(res?.data?.employee))
                navigate('/');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, {duration: 2000})
           console.log(`Error in login : ${error?.response?.data?.message}`) 
        }finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Login to Your Account
                </h2>
                <form className="space-y-6" onSubmit={handleLogin} >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}
