import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import EnergySectorPage from "./pages/EnergySectorPage"
import ComparisonPage from "./pages/ComparisonPage"
import MerchantDashboard from "./pages/MerchantDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import AuthProvider from "./contexts/AuthContext"
import "./App.css"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sectors/energy" element={<EnergySectorPage />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    {/* Ajoutez d'autres routes ici */}
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
