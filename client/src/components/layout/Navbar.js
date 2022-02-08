import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
    //     <div className="container px-4 px-lg-5">
    //       <a className="navbar-brand" href="#!">
    //         Start Bootstrap
    //       </a>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarResponsive"
    //         aria-controls="navbarResponsive"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarResponsive">
    //         <ul className="navbar-nav ml-auto">
    //           <li className="nav-item active">
    //             <Link to="/" className="nav-link">
    //               Home
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="" className="nav-link">
    //               About
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/login" className="nav-link">
    //               Login
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/register" className="nav-link">
    //               Register
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>

    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
    </nav>
  );
};

export default Navbar;
