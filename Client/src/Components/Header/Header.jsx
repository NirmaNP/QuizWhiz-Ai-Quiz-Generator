import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaChartLine, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
      console.log(token);
      if (token) {
        try {
          const response = await axios.post(`${URL}/user/getuser`,null,{
            headers: {
              'auth-token': token
            }
          });
          setUserName(response.data.name);
          console.log(userName);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
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
    setUserName('');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');  
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

              <div className="auth-section w-40 ml-5 mr-5">
                {isLoggedIn ? (
                  <div 
                    className="profile-container relative flex items-center right-0"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    <div className="flex items-center">
                      <div className="profile-picture-container relative w-11 h-11 rounded-full bg-white border-1 border-black z-10 overflow-hidden">
                        <img
                          src="/Images/person.png"
                          alt="Profile"
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                      </div>
                      {userName && (
                        <span className="ml-2 text-white font-medium">
                          {userName}
                        </span>
                      )}
                    </div>
                    <div className={`
                      absolute left-0 h-10 flex items-center
                      bg-red-500 rounded-full overflow-hidden
                      transition-all duration-300 ease-in-out
                      ${showLogout ? 'w-40 pl-10 opacity-100' : 'w-0 opacity-0'}
                    `}>
                      <button 
                        className="flex items-center gap-2 text-white text-sm px-3 whitespace-nowrap"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="text-xs" /> 
                        <span>Logout</span>
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