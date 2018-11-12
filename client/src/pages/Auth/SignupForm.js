import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import AUTH from '../../utils/AUTH';
import "./LoginForm.css";
import BackgroundSlideshow from 'react-background-slideshow';

import image1 from './assets/img1.jpg';
import image2 from './assets/img2.jpg';
import image3 from './assets/img3.jpg';
import image4 from './assets/img4.jpg';
import image5 from './assets/img5.jpg';
import image6 from './assets/img6.jpg';
import image7 from './assets/img7.jpg';
import image8 from './assets/img8.jpg';
import image9 from './assets/img9.jpg';

class SignupForm extends Component {

	constructor() {
    super();
    
		this.state = {
      firstName: '',
      lastName: '',
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		};
  }
  
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
  }
  
	handleSubmit = (event) => {
		event.preventDefault();
		// TODO - validate!
		AUTH.signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }).then(response => {
      console.log(response);
      if (!response.data.errmsg) {
        console.log('youre good');
        this.setState({
          redirectTo: '/'
        });
      } else {
        console.log('duplicate');
      }
    });
  }
  
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    
		return (
      <div className="login">
      <Container className="zindex1">
        <Row className="zindex1">
          <Col className="zindex1" size="md-3"></Col>
          <Col className="zindex1" size="md-6">
            <Card className="zindex1" title="Register for YumBot">
              <form className="zindex1" style={{marginTop: 10}}>
                <h1>Register for YumBot!</h1>
                <label htmlFor="username">First name: </label>
                <Input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Last name: </label>
                <Input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                <Link to="/">Login</Link>
                <FormBtn onClick={this.handleSubmit}>Register</FormBtn>
              </form>
            </Card>
          </Col>
          <Col size="md-3"></Col>
        </Row>
      </Container>
      <BackgroundSlideshow images={[ image1, image2, image3, image4, image5, image6, image7, image8, image9 ]} />
      </div>
		)
	}
}

export default SignupForm;
