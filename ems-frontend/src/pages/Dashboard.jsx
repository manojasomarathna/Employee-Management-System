import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../services/EmployeeService";


function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getEmployees(0, 1)
            .then((res) => setEmployeeCount(res.data.totalElements))
            .catch(() => {});
    }, []);

    const cards = [
        {
            label: "Total Employees",
            value: employeeCount,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 0a3 3 0 11-6 0 3 3 0 016 0zM3 7a3 3 0 116 0 3 3 0 01-6 0z" />
                </svg>
            ),
            gradient: "from-blue-500 to-blue-600",
            light: "bg-blue-50 text-blue-600",
        },
        {
            label: "Active Employees",
            value: employeeCount,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: "from-emerald-500 to-emerald-600",
            light: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Departments",
            value: 3,
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4a1 1 0 011-1h2a1 1 0 011 1v4" />
                </svg>
            ),
            gradient: "from-violet-500 to-violet-600",
            light: "bg-violet-50 text-violet-600",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium">{card.label}</span>
                            <div className={`${card.light} p-2 rounded-xl`}>
                                {card.icon}
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800">{card.value}</p>
                        <div className={`mt-3 h-1 rounded-full bg-gradient-to-r ${card.gradient} opacity-60`} />
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-base font-semibold text-gray-700 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate("/employees")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        View All Employees
                    </button>
                    <button
                        onClick={() => navigate("/add-employee")}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Employee
                    </button>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-1">Employee Management System</h3>
                <p className="text-blue-100 text-sm">
                    Manage your workforce efficiently — add, update, search, and organize employee records with ease.
                </p>
            </div>

        </div>
    );
}

export default Dashboard;
