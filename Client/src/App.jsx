// Website created and maintained by Nikhil Solanki and Princy Pandya, 2025 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home';
import Quiz from './Components/Pages/Quiz/Quiz';
import Signup from './Components/Pages/Authentication/Signup/Signup';
import Login from './Components/Pages/Authentication/Login/Login';
import Results from './Components/Pages/Results/Results';
import Account from './Components/Pages/Account/Account';
import About from './Components/Pages/About';
import Help from './Components/Pages/Help';

const App = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/signup'].includes(location.pathname.toLowerCase());
  const hideFooter = ['/login', '/signup', '/quiz'].includes(location.pathname.toLowerCase());
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!hideHeader && <Header />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;