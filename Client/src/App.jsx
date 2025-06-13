// Website created and maintained by Nikhil Solanki and Princy Pandya, 2025
import React from "react";
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
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/results" element={<Results />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<QuizLayout />}>
        <Route path="/quiz" element={<Quiz />} />{" "}
      </Route>
    </Routes>
  );
};

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const QuizLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const AuthLayout = () => <Outlet />;

export default App;
