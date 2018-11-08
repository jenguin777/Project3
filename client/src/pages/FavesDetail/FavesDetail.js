import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";

class FavesDetail extends Component {
  state = {
    recipe: {}
  };

  // When this component mounts, grab the recipe with the _id of this.props.match.params.id
  componentDidMount() {
    console.log(this.props);
    API.getFave(this.props.match.params.id)
      .then(res => this.setState({ recipe: res.data }))
      .catch(err => console.log(err));
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.recipe.title}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
        <Col size="md-2">    </Col>
          <Col size="md-8 md-offset-1">
            <article>
              <h1>Ingredients</h1>
              <p>
              {this.state.recipe.ingredients}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
        <Col size="md-2">    </Col>
          <Col size="md-8 md-offset-1">
            <article>
              <h1>Instructions</h1>
              <p>
              {this.state.recipe.instructions}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
        <Col size="md-2">    </Col>
          <Col size="md-2">
            <Link to="/favoriterecipes">← Back to Favorite Recipes</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default FavesDetail;
