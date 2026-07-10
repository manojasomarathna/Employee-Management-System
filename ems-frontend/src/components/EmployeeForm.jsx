import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";


function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            getEmployeeById(id)
                .then((res) => setEmployee(res.data))
                .catch(() => toast.error("Failed to load employee."));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const request = isEdit ? updateEmployee(id, employee) : createEmployee(employee);

        request
            .then(() => {
                toast.success(isEdit ? "Employee updated successfully!" : "Employee added successfully!");
                navigate("/employees");
            })
            .catch(() => toast.error("Something went wrong. Please try again."))
            .finally(() => setLoading(false));
    };

    const fields = [
        { name: "firstName", label: "First Name", type: "text", placeholder: "e.g. Manoja" },
        { name: "lastName",  label: "Last Name",  type: "text", placeholder: "e.g. Somarathna" },
        { name: "email",     label: "Email Address", type: "email", placeholder: "e.g. manoja@example.com" },
    ];

    return (
        <div className="min-h-[80vh] flex items-start justify-center pt-10 px-4">
            <div className="w-full max-w-lg">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Card header */}
                    <div className={`px-8 py-5 ${isEdit ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-blue-600 to-blue-500"}`}>
                        <h2 className="text-xl font-bold text-white">
                            {isEdit ? "Edit Employee" : "Add New Employee"}
                        </h2>
                        <p className="text-white/80 text-sm mt-0.5">
                            {isEdit ? "Update the employee details below." : "Fill in the details to add a new employee."}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-6 grid gap-5">

                        {fields.map(({ name, label, type, placeholder }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                    value={employee[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 bg-gray-50 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-colors"
                                />
                            </div>
                        ))}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
                                    isEdit
                                        ? "bg-amber-500 hover:bg-amber-600"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {loading ? "Saving..." : isEdit ? "Update Employee" : "Add Employee"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/employees")}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default EmployeeForm;
