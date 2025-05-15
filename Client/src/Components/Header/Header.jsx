import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaChartLine, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Token removed from local storage: " + localStorage.getItem('token'));
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="shadow-sm py-3 fixed top-0 w-full z-10 bg-blue-600 bg-opacity-70 backdrop-blur-md border-b border-gray-200"
      >
        <Container fluid className="pl-8">
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

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ms-auto flex items-center">
              <Nav.Link
                as={Link}
                to="/"
                className="text-gray-800 flex items-center mx-3 hover-effect"
              >
                <FaHome className="mr-2" /> Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Results"
                className="text-gray-800 flex items-center mx-3 hover-effect"
              >
                <FaChartLine className="mr-2" /> Results
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/Quiz"
                className="text-gray-800 flex items-center mx-3 hover-effect"
              >
                <FaCogs className="mr-2" /> Quiz
              </Nav.Link>

              <div className="auth-section w-40 ml-5">
                {isLoggedIn ? (
                  <div 
                    className="profile-container relative flex items-center right-0"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    <div className="profile-picture-container relative w-10 h-10 rounded-full bg-white border-1 border-black z-10 overflow-hidden">
                      <img
                        src="/Images/person.png"
                        alt="Profile"
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                    </div>
                    <div className={`logout-container absolute left-5 top-0 h-10 rounded-r-full bg-red-500 flex items-center overflow-hidden transition-all duration-300 z-0 shadow-md ${showLogout ? 'w-24 px-2' : 'w-0'}`}>
                      <button 
                        className={`bg-red-500 text-white border-0 whitespace-nowrap transition-all duration-300 flex items-center text-sm p-3 ${showLogout ? 'opacity-100 translate-x-0 delay-100' : 'opacity-0 -translate-x-2'}`}
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
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
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="pt-20"></div>
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
        `}
      </style>
    </>
  );
}

export default Header;