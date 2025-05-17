import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';
import './Signup.css';

function Signup() {

    const URL = import.meta.env.VITE_API_URL;
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        form: ""
    });
    
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            form: ""
        };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
            isValid = false;
        } else if (formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
            isValid = false;
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
            isValid = false;
        } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain at least one special character";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (Object.values(touched).some(field => field)) {
            validate();
        }
    }, [formData, touched]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true
        });

        if (validate()) {
            setIsLoading(true);
            setErrors(prev => ({ ...prev, form: "" }));
            
            axios.post(`${URL}/user/createuser`, {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            .then(result => {
                localStorage.setItem('token', result.data.authToken);
                navigate('/'); 
            })
            .catch(err => {
                console.log("Signup error:", err);
                if (err.response && err.response.status === 409) {
                    setErrors(prev => ({ ...prev, form: "Email already exists. Please use a different email." }));
                } else {
                    setErrors(prev => ({ ...prev, form: err.response?.data?.message || "Signup failed. Please try again." }));
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-primary">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
                            {/* Header Section */}
                            <div className="card-header bg-primary text-white py-4">
                                <div className="text-center">
                                    <h2 className="fw-bold mb-1">Create Your Account</h2>
                                    <p className="mb-0 opacity-75">Join us to get started</p>
                                </div>
                            </div>
                            
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit} noValidate>
                                    {/* Name Field */}
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-medium text-muted">Full Name</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-light">
                                                <FaUser className="text-primary" />
                                            </span>
                                            <input
                                                type="text"
                                                className={`form-control py-2 ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {touched.name && errors.name && (
                                                <div className="invalid-feedback d-flex align-items-center">
                                                    <FaExclamationCircle className="me-1" />
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-medium text-muted">Email Address</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-light">
                                                <FaEnvelope className="text-primary" />
                                            </span>
                                            <input
                                                type="email"
                                                className={`form-control py-2 ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                name="email"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {touched.email && errors.email && (
                                                <div className="invalid-feedback d-flex align-items-center">
                                                    <FaExclamationCircle className="me-1" />
                                                    {errors.email}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-medium text-muted">Password</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-light">
                                                <FaLock className="text-primary" />
                                            </span>
                                            <input
                                                type="password"
                                                className={`form-control py-2 ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                                id="password"
                                                name="password"
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {touched.password && errors.password && (
                                                <div className="invalid-feedback d-flex align-items-center">
                                                    <FaExclamationCircle className="me-1" />
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-text">
                                            Password must be at least 8 characters with uppercase, number, and special character
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label fw-medium text-muted">Confirm Password</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-light">
                                                <FaLock className="text-primary" />
                                            </span>
                                            <input
                                                type="password"
                                                className={`form-control py-2 ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <div className="invalid-feedback d-flex align-items-center">
                                                    <FaExclamationCircle className="me-1" />
                                                    {errors.confirmPassword}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {errors.form && (
                                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mb-4">
                                            <FaExclamationCircle className="me-2 flex-shrink-0" />
                                            <div className="flex-grow-1">{errors.form}</div>
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => setErrors(prev => ({ ...prev, form: "" }))}
                                            ></button>
                                        </div>
                                    )}

                                    <div className="d-grid mb-3">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary py-2 fw-bold rounded-pill d-flex align-items-center justify-content-center"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    <span>Creating Account...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Sign Up</span>
                                                    <FaArrowRight className="ms-2" />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="position-relative my-4">
                                        <hr />
                                        <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
                                            OR
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="mb-0">Already have an account? 
                                        <Link to="/login" className="text-decoration-none text-primary fw-medium ms-1">
                                            Log in
                                        </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;