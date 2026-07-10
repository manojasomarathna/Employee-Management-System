import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../services/EmployeeService";


function Dashboard() {

    const [employeeCount, setEmployeeCount] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getEmployees(0, 1)
            .then((res) => setEmployeeCount(res.data.totalElements))
            .catch((err) => console.log(err));
    }, []);


    const cards = [
        {
            icon: "👥",
            label: "Total Employees",
            value: employeeCount,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200",
        },
        {
            icon: "✅",
            label: "Active Employees",
            value: employeeCount,
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-200",
        },
        {
            icon: "🏢",
            label: "Departments",
            value: 3,
            color: "text-purple-600",
            bg: "bg-purple-50",
            border: "border-purple-200",
        },
    ];


    return (
        <div className="max-w-6xl mx-auto p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome to Employee Management System</p>
            </div>


            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`${card.bg} border ${card.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-default`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{card.label}</p>
                                <p className={`text-4xl font-bold mt-1 ${card.color}`}>{card.value}</p>
                            </div>
                            <span className="text-4xl">{card.icon}</span>
                        </div>
                    </div>
                ))}
            </div>


            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">⚡ Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate("/employees")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm transition-colors"
                    >
                        👥 View All Employees
                    </button>
                    <button
                        onClick={() => navigate("/add-employee")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md text-sm transition-colors"
                    >
                        ➕ Add New Employee
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
