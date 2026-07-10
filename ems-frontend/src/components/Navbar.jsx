import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
    { to: "/", label: "Dashboard" },
    { to: "/employees", label: "Employees" },
    { to: "/add-employee", label: "Add Employee" },
];

function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
                    <span className="bg-white/20 rounded-lg px-2 py-1">🏢</span>
                    <span className="hidden sm:inline">Employee Management</span>
                    <span className="sm:hidden">EMS</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                location.pathname === to
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-blue-100 hover:bg-white/20"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>

            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-1">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                location.pathname === to
                                    ? "bg-white text-blue-700"
                                    : "text-blue-100 hover:bg-white/20"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
