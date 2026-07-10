import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ListEmployeeComponent from "./pages/ListEmployeeComponent";
import EmployeeComponent from "./pages/EmployeeComponent";

function App() {

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">

                <Navbar />

                <main className="flex-grow bg-gray-100">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/employees" element={<ListEmployeeComponent />} />
                        <Route path="/add-employee" element={<EmployeeComponent />} />
                        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
                    </Routes>
                </main>

                <footer className="bg-blue-600 text-blue-100 text-center py-4 text-sm">
                    © 2026 Employee Management System. All rights reserved.
                </footer>

            </div>

            <Toaster position="top-right" />
        </BrowserRouter>
    );
}

export default App;
