import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.text();
            if (!response.ok) {
                setError(data);
                return;
            }
           // Login successful
            window.location.href = "/";
        } catch (error) {
            console.error(error);
            setError("Unable to connect to server");
        }
    };
    return (
        <div className="container p-5">
            <div
                className="row justify-content-center"
                style={{ marginTop: "80px" }}
            >
                <div className="col-md-6">
                    <h1 className="text-center mb-4">
                        Login
                    </h1>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && (
                            <p className="text-danger">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;