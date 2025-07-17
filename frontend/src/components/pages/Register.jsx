import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
const API = "https://userdata-k5b2.onrender.com";


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // try {
        //   const res = await axios.post("http://localhost:8080/api/auth/register", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData),
        //   });

        //   if (!res.ok) throw new Error("Registration failed");

        //   const data = await res.json();
        //   console.log("Registration successful:", data);
        //   // Redirect or notify user here
        // } catch (err) {
        //   setError(err.message);
        // }
        //  finally {
        //   setLoading(false);
        // }
        // 
        console.log('data::', formData)
        try {
            const res = await axios.post(`${API}/api/auth/register`, formData);
            console.log("res::", res)

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                throw new Error("No token received");
            }
        } catch (err) {
            setError(err.data?.message || "register failed");
            console.error("Login error:", err);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1e2a38] w-96 p-8 rounded-xl shadow-xl relative"
            >
                {/* SIGN UP Banner */}
                <Link to='/'>

                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-white px-8 py-2 rounded-t-md font-semibold">
                        LOGIN
                    </div>
                </Link>

                {/* Avatar Placeholder */}
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
                    {/* Name */}
                    <div className="bg-gray-700 px-3 py-2 rounded-md">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="bg-transparent text-white outline-none w-full"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* DOB */}
                    <div className="bg-gray-700 px-3 py-2 rounded-md">
                        <input
                            type="date"
                            name="dob"
                            className="bg-transparent text-white outline-none w-full"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="bg-gray-700 px-3 py-2 rounded-md">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="bg-transparent text-white outline-none w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="bg-gray-700 px-3 py-2 rounded-md">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="bg-transparent text-white outline-none w-full"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="text-red-400 text-sm text-center mt-2">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-cyan-400 text-white font-bold py-2 rounded-md hover:bg-cyan-500 transition"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "REGISTER"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
