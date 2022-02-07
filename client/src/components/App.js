import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./layout/Landing";
import Navbar from "./layout/Navbar";
import Register from "./auth/Register";
import Login from "./auth/Login";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          {/*  <Route exact path="/update" element={<UpdatePage />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
