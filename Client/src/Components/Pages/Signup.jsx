import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(""); // Error message for email validation
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(""); // Clear previous errors

        try {
            // Fetch all registered users
            const usersResponse = await axios.get('http://localhost:5175/getUsers'); 
            const users = usersResponse.data;

            // Check if the entered email already exists
            const emailExists = users.some(user => user.email === email);

            if (emailExists) {
                setEmailError("Email already exists. Please use another email.");
                return; // Stop execution
            }

            // Proceed with signup if email is unique
            axios.post('http://localhost:5175/Signup', { name, email, password })
                .then(result => {
                    console.log("Signup successful:", result.data);
                    localStorage.setItem('token', email);
                    navigate('/');
                })
                .catch(err => console.log("Signup error:", err));

        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 mt-5 mb-5">
                <div className="shadow p-4 bg-light rounded w-50">
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <span className="fs-4 fw-bold">Create an account!</span>
                    </div>
                    <form className='fs-0' onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder="Enter your full name" 
                                required 
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter your email address" 
                                required 
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                            {emailError && <div className="text-danger mt-1">{emailError}</div>} {/* Display error message */}
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Enter your password" 
                                required 
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirmPassword" 
                                placeholder="Confirm your password" 
                                required 
                            />
                        </div>
                        {/* Sign Up Button */}
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
