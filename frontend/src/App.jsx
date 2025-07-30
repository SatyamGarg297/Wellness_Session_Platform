import React from "react";
import { Route, Routes } from "react-router-dom";
import SessionEditor from "./pages/SessionEditor/SessionEditor";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MySessions from "./pages/MySessions/MySessions";
import Navbar from "./components/Navbar/Navbar";




const App = () => {
  return (
    <>
       <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/editor/:id?" element={<SessionEditor />} />
      </Routes>
    </>
  );
};

export default App;

