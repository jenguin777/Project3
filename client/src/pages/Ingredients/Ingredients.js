import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Ingredients extends Component {
  state = {
    ingredients: [],
    title: "",
    author: "",
    synopsis: ""
  };

  componentDidMount() {
    this.loadIngredients();
  }

  loadIngredients = () => {
    API.getIngredients()
      .then(res =>
        this.setState({ ingredients: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteIngredient = id => {
    API.deleteIngredient(id)
      .then(res => this.loadIngredients())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.ingredient) {
      API.saveIngredient({
        ingredient: this.state.ingredient
      })
        .then(res => this.loadIngredients())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <div class="page-header">
              <h1>What Ingredients Do I Have?</h1>
              <form>
                <Input
                  value={this.state.ingredient}
                  onChange={this.handleInputChange}
                  name="ingredient"
                  placeholder="Ingredient (required)"
                />
                <FormBtn
                  disabled={!(this.state.ingredient)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Ingredient
                </FormBtn>
              </form>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <div class="page-header">
              <h1>Recipes With Your Ingredients:</h1>
          {/*  
            {this.state.ingredients.length ? (
              <List>
                {this.state.ingredients.map(book => (
                  <ListItem key={ingredient._id}>
                    <Link to={"/ingredients/" + ingredient._id}>
                      <strong>
                        
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteIngredient(ingredient._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            */}    

            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ingredients;
