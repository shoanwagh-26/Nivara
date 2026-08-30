import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.text();

            if (!response.ok) {
                setError(data);
                return;
            }

            alert("Account created successfully!");

            // After successful signup → go to login
            navigate("/login");

        } catch (error) {
            console.error(error);
            setError("Unable to connect to server");
        }
    };

    return (
    <div>
        <Hero />
        <div className="container p-5">
            <div
                className="row justify-content-center"
                style={{ marginTop: "50px" }}
            >
                <div className="col-md-6">

                    <h1 className="text-center mb-4">
                        Create your account
                    </h1>

                    <form onSubmit={handleSignup}>

                        <div className="mb-3">
                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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

                        <div className="mb-3">
                            <label className="form-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
                            Create Account
                        </button>

                    </form>

                </div>
            </div>
        </div>
    </div>
    );
}

export default Signup;