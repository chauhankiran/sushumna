import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import CompanyNew from "./pages/CompanyNew";
import CompanyShow from "./pages/CompanyShow";
import CompanyEdit from "./pages/CompanyEdit";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/companies/new" element={<CompanyNew />} />
                    <Route path="/companies/:id/edit" element={<CompanyEdit />} />
                    <Route path="/companies/:id" element={<CompanyShow />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
