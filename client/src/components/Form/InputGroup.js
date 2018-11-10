import React from "react";

export const InputGroup = props => (
  <div className="input-group mb-3">
    <input type="text" name="addIngr" value={props.addIngr} onChange={props.handleInputChange} className="form-control" placeholder={props.placeholder} aria-label={props.placeholder} aria-describedby="button-submit"/>

    <div className="input-group-append">
      <button className={props.className} onClick={props.handleFormSubmit} type="button" id="button-submit">{props.btnText}</button>
    </div>
  </div>
);
