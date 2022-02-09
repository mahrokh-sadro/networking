// import React from "react";
// import image from "./hero.jpg";
// import { Link } from "react-router-dom";
// const Landing = () => {
//   return (
//     <>
//       {/* <section
//         style={{
//           backgroundImage: `url(${image})`,
//           height: "700px",
//           // backgroundPosition: "center",
//           // backgroundSize: "cover",
//           // backgroundRepeat: "no-repeat",
//         }}
//       >
//         <div className="container px-4 px-lg-5">
//           <div className="row gx-4 gx-lg-5">
//             <div className="col-lg-6">
//               <h1 className="mt-5">The Big Picture</h1>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//                 Deserunt voluptates rerum eveniet sapiente repellat esse,
//                 doloremque quod recusandae deleniti nostrum assumenda vel beatae
//                 sed aut modi nesciunt porro quisquam voluptatem.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section> */}

//       <section
//         style={{
//           backgroundImage: `url(${image})`,
//           height: "700px",
//           // cover: "objectfit",
//           // backgroundPosition: "center",
//           // backgroundSize: "cover",
//           // backgroundRepeat: "no-repeat",
//           position: "relative",
//         }}
//       >
//         {/* <div className="dark-overlay"> */}
//         <div>
//           <div className="landing-inner">
//             <h1 className="x-large">Developer Connector</h1>
//             <p className="lead">
//               Create a developer profile/portfolio, share posts and get help
//               from other developers
//             </p>
//             <div className="buttons">
//               <Link to="/register" className="btn btn-primary">
//                 Sign Up
//               </Link>
//               <Link to="/login" className="btn btn-light">
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Landing;
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
