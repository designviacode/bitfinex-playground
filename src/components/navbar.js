import React, { PropTypes } from "react";
// COMPONENTS
import Avatar from "./avatar";
// CONFIG
import Config from "../config";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="flex-auto">
          <img src={Config.platformLogo} alt="" className="logo" />
        </div>
        <div>
          <Avatar source="https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg" />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {};
