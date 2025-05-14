import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import.meta.env
function Login() {

    const URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        form: ''
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Validate form fields
    const validate = () => {
        const newErrors = {
            email: '',
            password: '',
            form: ''
        };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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
            email: true,
            password: true
        });

        if (validate()) {
            setIsLoading(true);
            setErrors(prev => ({ ...prev, form: '' }));
            
            axios.post(`${URL}/Login`, formData)
                .then(result => {
                    console.log("Login successful:", result.data);
                    localStorage.setItem('token', formData.email);
                    console.log("Token stored in local storage: "+localStorage.getItem('token'));
                    
                    window.dispatchEvent(new Event('auth-change'));
                    
                    navigate('/');  
                })
                .catch(err => {
                    console.log("Login error:", err);
                    if (err.response && err.response.status === 401) {
                        setErrors(prev => ({ ...prev, form: "Invalid email or password" }));
                    } else if (err.response && err.response.data && err.response.data.message) {
                        setErrors(prev => ({ ...prev, form: err.response.data.message }));
                    } else {
                        setErrors(prev => ({ ...prev, form: "An error occurred. Please try again." }));
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
                                    <h2 className="fw-bold mb-1">Welcome Back!</h2>
                                    <p className="mb-0 opacity-75">Sign in to continue to your account</p>
                                </div>
                            </div>
                            
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit} noValidate>
                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-medium text-muted">Email Address</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text bg-light">
                                                <FaUser className="text-primary" />
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
                                                placeholder="Enter your password"
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
                                        <div className="text-end mt-2">
                                            <a href="/forgot-password" className="text-decoration-none text-primary small">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    {errors.form && (
                                        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center mb-4">
                                            <FaExclamationCircle className="me-2 flex-shrink-0" />
                                            <div className="flex-grow-1">{errors.form}</div>
                                            <button 
                                                type="button" 
                                                className="btn-close" 
                                                onClick={() => setErrors(prev => ({ ...prev, form: '' }))}
                                            ></button>
                                        </div>
                                    )}

                                    <div className="d-grid mb-3">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary py-2 fw-bold rounded-pill"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Logging in...
                                                </>
                                            ) : (
                                                'Log In'
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
                                        <p className="mb-0">Don't have an account? 
                                            <Link to="/signup" className="text-decoration-none text-primary fw-medium ms-1">
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                {`
                    .bg-gradient-primary {
                        background: linear-gradient(135deg, #f5f7fa 0%, #e4f0fb 100%);
                    }
                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
                    }
                    .form-control:focus {
                        border-color: #4dabf7;
                        box-shadow: 0 0 0 0.25rem rgba(77, 171, 247, 0.25);
                    }
                    .btn-primary {
                        background-color: #4dabf7;
                        border-color: #4dabf7;
                        transition: all 0.3s ease;
                    }
                    .btn-primary:hover {
                        background-color: #339af0;
                        border-color: #339af0;
                        transform: translateY(-1px);
                    }
                    .input-group-text {
                        transition: background-color 0.3s ease;
                    }
                    .is-invalid {
                        border-color: #dc3545;
                    }
                    .is-invalid:focus {
                        box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
                    }
                    .invalid-feedback {
                        color: #dc3545;
                        font-size: 0.875em;
                    }
                `}
            </style>
        </div>
    );
}

export default Login;