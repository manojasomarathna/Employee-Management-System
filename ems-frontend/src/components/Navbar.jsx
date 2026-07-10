import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    const navLink = (to, label) => (
        <Link
            to={to}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === to
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
            }`}
        >
            {label}
        </Link>
    );

    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                <Link to="/" className="text-white text-xl font-bold tracking-wide">
                    🏢 Employee Management System
                </Link>

                <div className="flex gap-2">
                    {navLink("/", "Dashboard")}
                    {navLink("/employees", "Employees")}
                    {navLink("/add-employee", "Add Employee")}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
