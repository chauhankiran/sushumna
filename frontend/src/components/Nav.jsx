import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("http://localhost:3000/logout", {
            credentials: "include",
        })
            .then(() => {
                logout();
                navigate("/login");
            })
            .catch((err) => {
                console.error("Logout error:", err);
            });
    };

    return (
        <nav className="nav">
            <div className="nav-start">
                <Link to="/" className="nav-brand">
                    Sus
                </Link>
            </div>
            <div className="nav-end">
                {isLoggedIn ? (
                    <a href="#" className="nav-item" onClick={handleLogout}>
                        Logout
                    </a>
                ) : (
                    <>
                        <Link to="/login" className="nav-item">
                            Login
                        </Link>
                        <Link to="/register" className="nav-item">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
