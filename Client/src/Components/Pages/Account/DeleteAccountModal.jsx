import React, { useState } from 'react';
import axios from 'axios';
import { FaExclamationTriangle, FaTrash } from 'react-icons/fa';

function DeleteAccountModal({ show, onClose }) {
    const URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await axios.delete(`${URL}/user/deleteaccount`, {
                headers: {
                    'auth-token': token
                },
                data: {
                    password: password.trim()
                }
            });

            localStorage.removeItem('token');
            window.dispatchEvent(new Event('auth-change'));
            window.location.href = '/'; 

        } catch (err) {
            if (err.response?.status === 401) {
                setError("Incorrect password. Please try again.");
            } else {
                setError("An error occurred. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 m-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="bg-red-600 text-white p-4 rounded-t-lg flex justify-between items-center">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <FaExclamationTriangle /> Delete Account
                    </h3>
                    <button 
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-white hover:text-gray-200 text-xl"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="p-6">
                    <div className="mb-6 bg-red-50 border-l-4 border-red-600 p-4">
                        <p className="text-red-800 font-medium">
                            Warning: This action is irreversible!
                        </p>
                        <p className="text-red-700 text-sm mt-1">
                            All your account data, quiz results, and progress will be permanently deleted.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">
                                Enter your password to confirm deletion
                            </label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded flex items-center">
                                <FaExclamationTriangle className="mr-2" />
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-70 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <FaTrash /> Delete Account
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;