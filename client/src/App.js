import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "../src/components/layout/Landing";
import Navbar from "../src/components/layout/Navbar";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import { Provider } from "react-redux";
import store from "./store.js";
import Alert from "./components/layout/Alert";

import "./App.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            {/*  <Route exact path="/update" element={<UpdatePage />} /> */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
