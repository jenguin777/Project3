import React, { Fragment } from "react";
// import { Link } from 'react-router-dom';
// import { Col } from '../Grid';
import image from '../../assets/computerChefLogo.png';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
		greeting = <p>Hello guest</p>
	} else if (props.user.firstName) {
		greeting = (
			<Fragment>
				Welcome, <strong>{props.user.firstName}</strong>
			</Fragment>
		)
	} else if (props.user.username) {
		greeting = (
			<Fragment>
				Welcome, <strong>{props.user.username} </strong>
			</Fragment>
		)
  }
  
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/"><img src={image} height="80px" width="80px" alt=""/></a>
      <div className="app-name">YumBot</div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">   
        <i className="fa fa-navicon"></i>
      </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/favoriterecipes">Favorite Recipes</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/personalrecipe">Personal Recipes</a>
          </li>
        </ul>
        <div className="float-right">
          {greeting}&emsp;&emsp;  
          <a href="/" className="logout" onClick={props.logout}>Logout</a>
        </div>
      </div>
    </nav>    
  )
};

export default Nav;
