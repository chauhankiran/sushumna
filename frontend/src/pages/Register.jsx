import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";

const Register = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        // Validation
        if (!formFields.firstName.trim()) {
            setError("First name is required.");
            return;
        }
        if (!formFields.lastName.trim()) {
            setError("Last name is required.");
            return;
        }
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
        if (formFields.password !== formFields.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const { confirmPassword, ...formObj } = formFields;

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObj),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    navigate("/login", {
                        state: {
                            message: "Account is created. Login to continue.",
                        },
                    });
                } else if (data && data.error) {
                    setError(data.error);
                } else {
                    setError("Unexpected response from server.");
                }
            })
            .catch((err) => {
                console.error("Registration error:", err);
                setError(
                    "An error occurred during registration. Please try again.",
                );
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <h1 className="mb-4 mt-4">Register</h1>

                    <Error message={error} />
                    <form
                        action="/register"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-4">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Kai"
                                value={formFields.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                value={formFields.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                                placeholder="********"
                                value={formFields.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Again ********"
                                value={formFields.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <button type="submit">Register</button>
                        </div>

                        <div className="mb-4">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="col-8"></div>
            </div>
        </div>
    );
};

export default Register;
