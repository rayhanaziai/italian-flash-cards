import React from "react";
import { Link } from "react-router-dom";


import { RouteNames } from "../../constants/routes";


const TopNav: React.FC = () => {

  return (
    <div className="topnav-container">
      {/* <h1 className="logo"><a href="#">Flexbox</a></h1> */}
      <Link
          to={`${RouteNames.Index}`}>
      <img src={require("../../mainLogo.png")} alt="logo"/>
      </Link>
      {/* <div className="topnav-items">
        <Link
          to={`${RouteNames.Input}`}
          className="logo text-smooth-black px-8"
        >
          Input Phrases
        </Link>
        <Link
          to={`${RouteNames.Index}`}
          className="logo text-smooth-black px-8"
        >
          Home
        </Link>
      </div> */}
    </div>
  );
};

export default TopNav;
