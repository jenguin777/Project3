import React from "react";
import "./FaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const FaveBtn = props => (
  <span className="fave-btn" {...props}>
    ♡
  </span>
);

export default FaveBtn;
