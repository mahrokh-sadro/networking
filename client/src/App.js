import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "../src/components/layout/Landing";
import Navbar from "../src/components/layout/Navbar";
import Register from "../src/components/auth/Register";
import Login from "../src/components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from '../src/components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';

//redux
import { Provider } from "react-redux";
import store from "./store.js";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener("storage", () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar style={{ marginBottom: "200px" }}/>
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard"  element={<PrivateRoute component={Dashboard} />} />
            <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
