import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLock, FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

function ChangePasswordModal({ show, onClose }) {
    const URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        form: ''
    });
    const [touched, setTouched] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = () => {
        const newErrors = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            form: ''
        };
        let isValid = true;

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
            isValid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
            isValid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const resetForm = () => {
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setErrors({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            form: ''
        });
        setTouched({
            currentPassword: false,
            newPassword: false,
            confirmPassword: false
        });
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
            currentPassword: true,
            newPassword: true,
            confirmPassword: true
        });

        if (validate()) {
            setIsLoading(true);
            setErrors(prev => ({ ...prev, form: '' }));
            
            axios.put(`${URL}/user/updatepassword`, {
                currentPassword: formData.currentPassword.trim(),
                newPassword: formData.newPassword.trim()
            }, {
                headers: {
                    'auth-token': token
                }
            })
            .then(() => {
                resetForm(); // Clear all form data
                onClose(); // Close the modal
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    setErrors(prev => ({ ...prev, form: "Current password is incorrect" }));
                } else {
                    setErrors(prev => ({ ...prev, form: "An error occurred. Please try again." }));
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="font-bold text-lg">Change Password</h3>
                    <button 
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}
                        disabled={isLoading}
                        className="text-white hover:text-gray-200 text-xl"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Current Password Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className={`w-full p-2 border rounded ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-2 top-2 text-gray-500"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.currentPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className={`w-full p-2 border rounded ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-2 top-2 text-gray-500"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.newPassword}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className={`w-full p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-2 top-2 text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <FaExclamationCircle className="mr-1" />
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Form Error Message */}
                        {errors.form && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded flex items-center">
                                <FaExclamationCircle className="mr-2" />
                                {errors.form}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <button 
                                type="button" 
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                disabled={isLoading}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
                            >
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePasswordModal;