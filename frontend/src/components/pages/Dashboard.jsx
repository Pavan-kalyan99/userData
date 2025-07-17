import React, { useEffect, useState } from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import axios from "axios";
// import.meta.env.VITE_API_URL

const API = "https://usermanagement-l5l5.onrender.com";

// const users = [
//   {
//     id: 1,
//     name: "Michael Holz",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     date: "04/10/2013",
//     role: "Admin",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Paula Wilson",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     date: "05/08/2014",
//     role: "Publisher",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Antonio Moreno",
//     avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//     date: "11/05/2015",
//     role: "Publisher",
//     status: "Suspended",
//   },
//   {
//     id: 4,
//     name: "Mary Saveley",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//     date: "06/09/2016",
//     role: "Reviewer",
//     status: "Active",
//   },
//   {
//     id: 5,
//     name: "Martin Sommer",
//     avatar: "https://randomuser.me/api/portraits/men/5.jpg",
//     date: "12/08/2017",
//     role: "Moderator",
//     status: "Inactive",
//   },
// ];

const statusColors = {
    Active: "text-green-600",
    Inactive: "text-yellow-500",
    Suspended: "text-red-600",
};

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API}/api/auth/allusers`);
                console.log('res::', res)
                setUsers(res.data.users);
                setError('');
            } catch (err) {
                // console.error("Error fetching agents:", err);
                setError('Failed to load agent data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const getRandomAvatar = (seed) =>
        `https://i.pravatar.cc/150?u=${seed}`;
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">DOB</th>
                        {/* <th className="px-6 py-3">Status</th> */}
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{idx + 1}</td>
                            <td className="px-6 py-4 flex items-center gap-3">
                                <img
                                    src={getRandomAvatar(user.email)}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span>{user.name}</span>
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.dob}</td>
                            {/* <td className="px-6 py-4">
                                <span className={`flex items-center gap-2 ${statusColors[user.status]}`}>
                                    <span className="h-2 w-2 rounded-full bg-current"></span>
                                    {user.status}
                                </span>
                            </td> */}
                            <td className="px-6 py-4 flex items-center gap-4">
                                <button className="text-blue-600 hover:text-blue-800">
                                    <FaCog />
                                </button>
                                <button className="text-red-600 hover:text-red-800">
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
