// Website created and maintained by Nikhil Solanki and Princy Pandya, 2025
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Pages/Home";
import Quiz from "./Components/Pages/Quiz/Quiz";
import Signup from "./Components/Pages/Authentication/Signup/Signup";
import Login from "./Components/Pages/Authentication/Login/Login";
import Results from "./Components/Pages/Results/Results";
import Account from "./Components/Pages/Account/Account";
import About from "./Components/Pages/About";
import Help from "./Components/Pages/Help";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
    <Routes>
      <Route element={<MainLayout  darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/results" element={<Results />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route element={<AuthLayout/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<QuizLayout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
        <Route path="/quiz" element={<Quiz />} />{" "}
      </Route>
    </Routes>
    </>
  );
};

const MainLayout = ({ darkMode, setDarkMode }) => (
  <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
    <Outlet />
    <Footer />
  </>
);

const QuizLayout = ({ darkMode, setDarkMode }) => (
  <>
    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
    <Outlet />
  </>
);

const AuthLayout = () => <Outlet />;

export default App;
