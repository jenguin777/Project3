import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ height: 160, clear: "both", paddingTop: 60, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
