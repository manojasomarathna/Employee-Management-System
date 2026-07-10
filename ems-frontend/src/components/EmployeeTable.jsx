import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getEmployees, deleteEmployee, searchEmployees } from "../services/EmployeeService";


const fetchReducer = (state, action) => {
    switch (action.type) {
        case "LOADING": return { ...state, loading: true, error: null };
        case "SUCCESS": return { loading: false, error: null, employees: action.employees, totalPages: action.totalPages ?? state.totalPages };
        case "ERROR":   return { ...state, loading: false, error: action.error };
        default: return state;
    }
};

const avatarColor = (name = "") => {
    const colors = ["bg-blue-500","bg-emerald-500","bg-violet-500","bg-amber-500","bg-rose-500","bg-cyan-500"];
    return colors[name.charCodeAt(0) % colors.length];
};


function EmployeeTable() {
    const navigate = useNavigate();

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

        if (value.trim() === "") { refresh(); return; }

        dispatch({ type: "LOADING" });
        searchEmployees(value)
            .then((res) => dispatch({ type: "SUCCESS", employees: res.data }))
            .catch(() => dispatch({ type: "ERROR", error: "Search failed." }));
    };

    const handleDelete = () => {
        deleteEmployee(confirmDeleteId)
            .then(() => {
                toast.success("Employee deleted successfully!");
                setConfirmDeleteId(null);
                refresh();
            })
            .catch(() => toast.error("Failed to delete employee."));
    };

    return (
        <div className="p-6 md:p-8">

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{employees.length} record{employees.length !== 1 ? "s" : ""} shown</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Search */}
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by first name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-colors"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
                        className="border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="id">Sort: ID</option>
                        <option value="firstName">Sort: First Name</option>
                        <option value="email">Sort: Email</option>
                    </select>

                    <select
                        value={sortDirection}
                        onChange={(e) => { setSortDirection(e.target.value); setPage(0); }}
                        className="border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="asc">↑ Ascending</option>
                        <option value="desc">↓ Descending</option>
                    </select>

                    <button
                        onClick={() => navigate("/add-employee")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Employee
                    </button>

                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 mb-5">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Table card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
                        <span className="text-gray-400 text-sm">Loading employees...</span>
                    </div>
                ) : employees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                        <svg className="w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p className="font-medium">No employees found</p>
                        <p className="text-sm">Try a different search or add a new employee.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">

                                        <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{emp.id}</td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`${avatarColor(emp.firstName)} w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                                                    {emp.firstName?.[0]?.toUpperCase()}{emp.lastName?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{emp.firstName} {emp.lastName}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500">{emp.email}</td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">

                                                <button
                                                    onClick={() => navigate(`/edit-employee/${emp.id}`)}
                                                    className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </button>

                                                {confirmDeleteId === emp.id ? (
                                                    <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                                                        <span className="text-xs text-red-600 font-medium mr-1">Sure?</span>
                                                        <button onClick={handleDelete} className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded font-medium">Yes</button>
                                                        <button onClick={() => setConfirmDeleteId(null)} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-0.5 rounded font-medium">No</button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setConfirmDeleteId(emp.id)}
                                                        className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                )}

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {!searchTerm && totalPages > 1 && (
                <div className="flex items-center justify-between mt-5">

                    <p className="text-sm text-gray-400">
                        Page <span className="font-medium text-gray-600">{page + 1}</span> of <span className="font-medium text-gray-600">{totalPages}</span>
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage((p) => p - 1)}
                            disabled={page === 0}
                            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                    page === i
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page === totalPages - 1}
                            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            Next →
                        </button>
                    </div>

                </div>
            )}

        </div>
    );
}

export default EmployeeTable;
