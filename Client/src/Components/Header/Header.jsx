import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaCogs,
  FaQuestionCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarURL, setAvatarURL] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const response = await axios.post(`${URL}/user/getuser`, null, {
            headers: { "auth-token": token },
          });
          setUserName(response.data.name);
          setAvatarURL(response.data.avatarImageURL);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    { to: "/about", label: "About", icon: <FaCogs className="mr-2" /> },
    {
      to: "/Results",
      label: "Results",
      icon: <FaChartLine className="mr-2" />,
    },
    { to: "/help", label: "Help", icon: <FaQuestionCircle className="mr-2" /> },
  ];

  if (isLoggedIn) {
    navLinks.push({
      to: "/account",
      label: "Dashboard",
      icon: <FaTachometerAlt className="mr-2" />,
    });
  }

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="fixed top-0 w-full z-50 py-3 shadow-sm bg-white/70 dark:bg-black backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
      >
        <Container fluid className="pl-0 sm:pl-8">
          
          <Navbar.Brand
            as={Link}
            to="/"
            className="relative flex items-center mr-auto h-12"
          >
            <img
              src="/Images/site-logo.png"
              alt="QuizWhiz Logo"
              className="h-12 object-cover"
            />
            <p
              className={`absolute bottom-2 left-6 text-2xl  font-roboto font-semibold px-2 py-0.5 rounded
                ${darkMode ? "text-slate-100" : "text-black"}
              `}
            >
              QuizWhiz
            </p>
          </Navbar.Brand>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="lg:hidden mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            className="nav__btn lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <div
              className={`hamburger-line ${isOpen ? "open" : ""} dark:bg-white`}
            ></div>
            <div
              className={`hamburger-line ${isOpen ? "open" : ""} dark:bg-white`}
            ></div>
          </button>

          {/* Mobile Nav Content */}
          <div
            className={`nav__content lg:hidden ${
              isOpen ? "open" : ""
            } dark:bg-black`}
          >
            <ul className="nav__items">
              {navLinks.map(({ to, label, icon }) => (
                <li
                  key={label}
                  className="nav__item border-b border-gray-200 dark:border-gray-700"
                >
                  <Link
                    to={to}
                    className="nav__item-text dark:text-white dark:hover:text-blue-400"
                    onClick={toggleMenu}
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
              {!isLoggedIn && (
                <>
                  <li className="nav__item border-b border-gray-200 dark:border-gray-700">
                    <Link
                      to="/Login"
                      className="nav__item-text dark:text-white dark:hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link
                      to="/Signup"
                      className="nav__item-text dark:text-white dark:hover:text-blue-400"
                      onClick={toggleMenu}
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Desktop Nav Content */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-full justify-center ml-40"
          >
            <Nav className="mx-auto flex items-center gap-6">
              {navLinks.map(({ to, label, icon }) => (
                <Nav.Link
                  key={label}
                  as={Link}
                  to={to}
                  className="flex items-center text-gray-800 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {icon} {label}
                </Nav.Link>
              ))}
            </Nav>

            {/* Desktop Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Desktop Auth Section */}
            <div className="auth-section w-40 ml-5 text-sm mr-5">
              {!isLoggedIn ? (
                <div className="flex rounded-full border border-gray-200 dark:border-gray-700  dark:bg-black overflow-hidden">
                  <Nav.Link
                    as={Link}
                    to="/Login"
                    className="px-4 py-2 no-underline text-gray-800 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Nav.Link>
                  <div className="border-l border-gray-200 dark:border-gray-700"></div>
                  <Link
                    to="/Signup"
                    className="px-3 py-2 no-underline text-gray-800 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-300">
                  <Link
                    to="/account"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={avatarURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
                    />
                  </Link>
                  {userName}
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="pt-16 bg-white dark:bg-gray-800 transition-colors duration-300"></div>

      {/* Styles */}
      <style>{`
        .nav__btn {
          position: relative;
          width: 40px;
          height: 40px;
          padding: 10px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;
          z-index: 1000;
        }
        .hamburger-line {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: #3b82f6;
          transform-origin: 50% 50%;
          transition: transform 0.3s cubic-bezier(0.48, 0.43, 0.29, 1.3),
            background-color 0.3s;
        }
        .hamburger-line:first-child {
          margin-bottom: 7px;
          transform: ${isOpen ? "translateY(7px) rotate(-45deg)" : "none"};
        }
        .hamburger-line:last-child {
          transform: ${isOpen ? "translateY(-7px) rotate(45deg)" : "none"};
        }
        .nav__content {
          position: fixed;
          top: 80px;
          right: 0;
          width: ${isOpen ? "250px" : "0"};
          height: calc(100vh - 80px);
          background: white;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: width 0.3s ease;
          z-index: 999;
        }
        .dark .nav__content {
          background: black;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
        }
        .nav__items {
          list-style-type: none;
          padding: 20px;
          width: 250px;
        }
        .nav__item {
          padding: 15px 0;
        }
        .nav__item-text {
          display: flex;
          align-items: center;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          opacity: ${isOpen ? "1" : "0"};
          transition: opacity 0.3s ease ${isOpen ? "0.2s" : "0s"};
        }
        .nav__item-text:hover {
          color: #4f6dff;
        }
        @media (min-width: 992px) {
          .nav__btn,
          .nav__content {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
