import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";


function EmployeeForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

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

        const request = isEdit
            ? updateEmployee(id, employee)
            : createEmployee(employee);

        request
            .then(() => {
                toast.success(isEdit ? "Employee Updated Successfully!" : "Employee Added Successfully!");
                navigate("/employees");
            })
            .catch(() => {
                toast.error("Something went wrong. Please try again.");
            })
            .finally(() => setLoading(false));
    };


    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-8">

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEdit ? "✏️ Edit Employee" : "➕ Add Employee"}
            </h2>

            <form onSubmit={handleSubmit} className="grid gap-4">

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={employee.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={employee.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                <div className="flex gap-3 mt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-60 transition-colors"
                    >
                        {loading ? "Saving..." : isEdit ? "Update Employee" : "Add Employee"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    );
}

export default EmployeeForm;
