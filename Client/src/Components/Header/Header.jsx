// import statements remain unchanged
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaChartLine,
  FaCogs,
  FaSignOutAlt,
  FaQuestionCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState("");
  const [avatarURL, setAvatarURL] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const response = await axios.post(`${URL}/user/getuser`, null, {
            headers: {
              "auth-token": token,
            },
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  // Nav links shared by mobile and desktop
  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    { to: "/about", label: "About", icon: <FaCogs className="mr-2" /> },
    {
      to: "/Results",
      label: "Results",
      icon: <FaChartLine className="mr-2" />,
    },
    // { to: "/Quiz", label: "Quiz", icon: <FaCogs className="mr-2" /> },
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
        className="shadow-sm py-3 fixed top-0 w-full z-50 bg-opacity-70 backdrop-blur-md border-b border-gray-200"
      >
        <Container fluid className="pl-0 sm:pl-8">
          <Navbar.Brand
            as={Link}
            to="/"
            className="flex items-center mr-auto h-12"
          >
            <img
              src="/Images/logo.png"
              alt="QuizWhiz Logo"
              className="h-44 object-cover"
            />
          </Navbar.Brand>
          <button
            className="nav__btn lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <div className={`hamburger-line ${isOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isOpen ? "open" : ""}`}></div>
          </button>
          {/* Mobile Nav Content */}
          <div className={`nav__content lg:hidden ${isOpen ? "open" : ""}`}>
            <ul className="nav__items">
              {navLinks.map(({ to, label, icon }) => (
                <li key={label} className="nav__item">
                  <Link to={to} className="nav__item-text" onClick={toggleMenu}>
                    {icon} {label}
                  </Link>
                </li>
              ))}
              {!isLoggedIn && (
                <>
                  <li className="nav__item">
                    <Link
                      to="/Login"
                      className="nav__item-text"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link
                      to="/Signup"
                      className="nav__item-text"
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
            className="w-full justify-center"
          >
            <Nav className="mx-auto flex items-center gap-6">
              {navLinks.map(({ to, label, icon }) => (
                <Nav.Link
                  key={label}
                  as={Link}
                  to={to}
                  className="text-gray-800 flex items-center hover-effect"
                >
                  {icon} {label}
                </Nav.Link>
              ))}
            </Nav>

            {/* Desktop Auth Section */}
            {/* Desktop Auth Section */}
            <div className="auth-section w-40 ml-5 mr-5">
              {!isLoggedIn ? (
                <div className="auth-buttons flex rounded-full bg-white border border-gray-200 overflow-hidden">
                  <Nav.Link
                    as={Link}
                    to="/Login"
                    className="text-gray-800 px-3 py-2 no-underline hover-effect"
                  >
                    Login
                  </Nav.Link>
                  <div className="border-l border-gray-200"></div>
                  <Link
                    to="/Signup"
                    className="text-gray-800 px-3 py-2 no-underline hover-effect"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-800 font-medium">
                  <Link to="/account">
                    <img
                      src={avatarURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                    />
                  </Link>
                  {userName}
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="pt-20"></div>

      {/* Inline Styles (same as before, unchanged) */}
      <style>
        {`
          .hover-effect {
            position: relative;
            transition: all 0.3s ease;
          }
          .hover-effect::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #4f6dff;
            transition: width 0.3s ease;
          }
          .hover-effect:hover::after {
            width: 100%;
          }
          .hover-effect:hover {
            color: #4f6dff !important;
          }
          .profile-picture-container:hover img {
            transform: scale(1.1);
          }
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
            background: #3b82f6; /* Changed to blue-500 */
            transform-origin: 50% 50%;
            transition: transform 0.3s cubic-bezier(0.48, 0.43, 0.29, 1.3), background-color 0.3s;
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
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: width 0.3s ease;
            z-index: 999;
          }
          .nav__items {
            list-style-type: none;
            padding: 20px;
            width: 250px;
          }
          .nav__item {
            padding: 15px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          .nav__item:last-child {
            border-bottom: none;
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
            .nav__btn, .nav__content {
              display: none;
            }
          }
        `}
      </style>
    </>
  );
}

export default Header;
