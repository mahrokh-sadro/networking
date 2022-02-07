import React from "react";
import image from "./hero.jpg";

const Landing = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: `url(${image})`,
          height: "700px",
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-6">
              <h1 className="mt-5">The Big Picture</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt voluptates rerum eveniet sapiente repellat esse,
                doloremque quod recusandae deleniti nostrum assumenda vel beatae
                sed aut modi nesciunt porro quisquam voluptatem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
