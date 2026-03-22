import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Error from "../components/Error";
import Message from "../components/Message";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const params = new URLSearchParams(location.search);
    const message = location.state?.message || params.get("error");

    const [formFields, setFormFields] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setError("");
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!formFields.email.trim()) {
            setError("Email is required.");
            return;
        }
        if (!formFields.password) {
            setError("Password is required.");
            return;
        }
        if (formFields.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formFields),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data === "Login successful!") {
                    login();
                    navigate("/dashboard", {
                        state: {
                            message: "Login successful. Continue to dashboard.",
                        },
                    });
                } else if (data && data.error) {
                    setError(data.error);
                } else {
                    setError("Unexpected response from server.");
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <h1 className="mb-4 mt-4">Login</h1>

                    <Message message={message} />
                    <Error message={error} />

                    <form action="/login" method="post" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="kai@doe.com"
                                value={formFields.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*********"
                                value={formFields.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <button type="submit">Login</button>
                        </div>

                        <div className="mb-4">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="col-8"></div>
            </div>
        </div>
    );
};

export default Login;
