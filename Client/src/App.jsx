// Website created and maintained by Nikhil Solanki and Princy Pandya, 2025 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Pages/Home';
import Quiz from './Components/Pages/Quiz';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Results from './Components/Pages/Results';
import Account from './Components/Pages/Account/Account';
import FAQ from './Components/Pages/FAQ';

const Layout = () => {
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
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;