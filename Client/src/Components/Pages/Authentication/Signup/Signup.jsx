import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaExclamationCircle,FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    form: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      form: "",
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
      newErrors.password =
        "Password must contain at least one uppercase letter";
      isValid = false;
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
      isValid = false;
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
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
    if (Object.values(touched).some((field) => field)) {
      validate();
    }
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (validate()) {
      setIsLoading(true);
      setErrors((prev) => ({ ...prev, form: "" }));

      try {
        const result = await axios.post(`${URL}/user/createuser`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", result.data.authToken);
        window.dispatchEvent(new Event("auth-change"));
        navigate("/");
      } catch (err) {
        console.log("Signup error:", err);
        if (err.response && err.response.status === 409) {
          setErrors((prev) => ({
            ...prev,
            form: "Email already exists. Please use a different email.",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            form:
              err.response?.data?.message || "Signup failed. Please try again.",
          }));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md p-6 dark:bg-gray-800/50 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Create Your Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Join us to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <div className="mt-1 relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2 rounded-md shadow-sm text-sm
                  bg-gray-50 dark:bg-black/50
                  text-gray-900 dark:text-white
                  border transition-all duration-200
                  ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <div className="mt-1 relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2 rounded-md shadow-sm text-sm
                  bg-gray-50 dark:bg-black/50
                  text-gray-900 dark:text-white
                  border transition-all duration-200
                  ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-2 rounded-md shadow-sm text-sm
                  bg-gray-50 dark:bg-black/50
                  text-gray-900 dark:text-white
                  border transition-all duration-200
                  ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" /> {errors.password}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Password must be at least 8 characters with uppercase, number, and
              special character
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-10 py-2 rounded-md shadow-sm text-sm
                  bg-gray-50 dark:bg-black/50
                  text-gray-900 dark:text-white
                  border transition-all duration-200
                  ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <FaExclamationCircle className="mr-1" />{" "}
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Form Error */}
          {errors.form && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 px-3 py-2 rounded-md flex items-center">
              <FaExclamationCircle className="mr-2" /> {errors.form}
            </div>
          )}

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* OR Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                OR
              </span>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
