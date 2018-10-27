import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";

class PersonalRecipe extends Component {
  state = {
    title: "",
    ingredients: "",
    instructions: ""
  };
 
  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ title: res.data.title, ingredients: res.data.ingredients, instructions: res.data.instructions})
      )
      .catch(err => console.log(err));
  };
 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <img src="./assets/favicon.ico" className="img-thumbnail" alt="Responsive image" alt-text="recipe">
            </img>
          </Col>
          <Col size="md-8">
            <div className="form-group">
              <label for="formGroupExampleInput">Recipe Name</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Spaghetti Carbonara"/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Time to Prepare</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="90 minutes"/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Ingredient Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Eggs</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Butter</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Cream</td>
                  </tr>
                </tbody>
              </table>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          <div className="form-group">
            <label for="instructions">Recipe Instructions</label>
            <textarea className="form-control" rows="10" id="instructions"></textarea>
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PersonalRecipe;
