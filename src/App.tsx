import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import EnergySectorPage from "./pages/EnergySectorPage"
import ComparisonPage from "./pages/ComparisonPage"
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
                    {/* Ajoutez d'autres routes ici */}
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
