import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const API = "https://userdata-k5b2.onrender.com";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        // remember: false,
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post(`${API}/api/auth/login`, formData);
            console.log("res::", res)

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                throw new Error("No token received");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
            console.error("Login error:", err);
        }

        // finally {
        //   setLoading(false);
        // }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1e2a38] w-96 p-8 rounded-xl shadow-xl relative"
            >
                {/* SIGN IN Banner */}
                <Link to='/register'>

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-white px-8 py-2 rounded-t-md font-semibold">
                        SIGN IN
                    </div>
                </Link>

                {/* Avatar */}
                <div className="flex justify-center my-6">
                    <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-14 w-14 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                    </div>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                    {/* Username */}
                    <div>
                        <div className="flex items-center bg-gray-700 px-3 py-2 rounded-md mt-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-300 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                className="bg-transparent text-white outline-none w-full"
                                placeholder="email/username"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center bg-gray-700 px-3 py-2 rounded-md mt-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-300 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17 9h-1V7c0-2.8-2.2-5-5-5S6 4.2 6 7v2H5c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V10c0-.6-.4-1-1-1zM8 7c0-2.2 1.8-4 4-4s4 1.8 4 4v2H8V7z" />
                            </svg>
                            <input
                                type="password"
                                name="password"
                                className="bg-transparent text-white outline-none w-full"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="remember"
                                className="accent-cyan-400"
                                // checked={formData.remember}
                                onChange={handleChange}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-cyan-300 hover:underline">
                            Forgot your password?
                        </a>
                    </div>

                    {/* Error & Loading */}
                    {error && (
                        <div className="text-red-400 text-sm mt-2 text-center">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-cyan-400 text-white font-bold py-2 rounded-md hover:bg-cyan-500 transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "LOGIN"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
