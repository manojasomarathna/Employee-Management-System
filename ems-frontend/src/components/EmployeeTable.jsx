import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getEmployees, deleteEmployee, searchEmployees } from "../services/EmployeeService";


function EmployeeTable() {

    const navigate = useNavigate();

    const fetchReducer = (state, action) => {
        switch (action.type) {
            case "LOADING": return { ...state, loading: true, error: null };
            case "SUCCESS": return { loading: false, error: null, employees: action.employees, totalPages: action.totalPages ?? state.totalPages };
            case "ERROR":   return { ...state, loading: false, error: action.error };
            default: return state;
        }
    };

    const [{ employees, loading, error, totalPages }, dispatch] = useReducer(fetchReducer, {
        employees: [], loading: false, error: null, totalPages: 0
    });

    const [page, setPage] = useState(0);
    const pageSize = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => setRefreshKey((k) => k + 1);


    useEffect(() => {
        if (searchTerm.trim() !== "") return;

        let cancelled = false;

        dispatch({ type: "LOADING" });

        getEmployees(page, pageSize, sortBy, sortDirection)
            .then((res) => {
                if (!cancelled) dispatch({ type: "SUCCESS", employees: res.data.content, totalPages: res.data.totalPages });
            })
            .catch(() => {
                if (!cancelled) dispatch({ type: "ERROR", error: "Cannot connect to server. Please check the backend." });
            });

        return () => { cancelled = true; };
    }, [page, sortBy, sortDirection, refreshKey]);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPage(0);

        if (value.trim() === "") {
            refresh();
            return;
        }

        dispatch({ type: "LOADING" });
        searchEmployees(value)
            .then((res) => dispatch({ type: "SUCCESS", employees: res.data }))
            .catch(() => dispatch({ type: "ERROR", error: "Search failed." }));
    };


    const handleDelete = () => {
        deleteEmployee(confirmDeleteId)
            .then(() => {
                toast.success("Employee Deleted Successfully!");
                setConfirmDeleteId(null);
                refresh();
            })
            .catch(() => toast.error("Failed to delete employee."));
    };


    return (
        <div className="p-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">

                <h2 className="text-2xl font-bold text-gray-800">👥 Employees</h2>

                {/* Search */}
                <input
                    type="text"
                    placeholder="🔍 Search by first name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Sorting */}
                <div className="flex gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
                        className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
                    >
                        <option value="id">Sort by ID</option>
                        <option value="firstName">Sort by First Name</option>
                        <option value="email">Sort by Email</option>
                    </select>

                    <select
                        value={sortDirection}
                        onChange={(e) => { setSortDirection(e.target.value); setPage(0); }}
                        className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

            </div>


            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-700 border border-red-300 rounded-md p-4 mb-4">
                    ⚠️ {error}
                </div>
            )}


            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-500">Loading...</span>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full">

                        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">First Name</th>
                                <th className="p-4 text-left">Last Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-12 text-gray-400 text-lg">
                                        😕 No Employees Found
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-gray-700">{emp.id}</td>
                                        <td className="p-4 text-gray-700">{emp.firstName}</td>
                                        <td className="p-4 text-gray-700">{emp.lastName}</td>
                                        <td className="p-4 text-gray-700">{emp.email}</td>
                                        <td className="p-4 text-center flex justify-center gap-2">

                                            <button
                                                onClick={() => navigate(`/edit-employee/${emp.id}`)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
                                            >
                                                ✏️ Edit
                                            </button>

                                            {confirmDeleteId === emp.id ? (
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={handleDelete}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm"
                                                    >
                                                        Yes
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmDeleteId(null)}
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-md text-sm"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmDeleteId(emp.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            )}

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            )}


            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">

                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 0}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
                    >
                        ← Previous
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`px-4 py-2 rounded-md text-sm ${
                                page === i
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages - 1}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-40 text-sm"
                    >
                        Next →
                    </button>

                </div>
            )}

        </div>
    );
}

export default EmployeeTable;
