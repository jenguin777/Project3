import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { RecipeList, RecipeListItem } from "../../components/RecipeList";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn} from "../../components/Form";

class Ingredients extends Component {
  state = {
    name: "",
    recipes: [],
    chosenIngred: ["chicken"]
  };

  componentDidMount() {
    this.loadIngredients();
    this.loadAPIRecipes();
  }

  loadAPIRecipes = () => {
    API.getAPIRecipes(this.state.chosenIng)
      .then(res => this.setState({ recipes: res.data }))
      .catch(err => console.log(err));
  };

  loadIngredients = () => {
    API.getIngredients()
      .then(res =>

        this.setState({ ingredients: res.data, name: ""})
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

    if (this.state.name) {
      API.saveIngredient({
        name: this.state.name
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
            <div className="page-header">
              <h1>What Ingredients Do I Have?</h1>
              <form>
                <Input
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  name="name"
                  placeholder="Ingredient (required)"
                />
                <FormBtn
                  disabled={!(this.state.name)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Ingredient
                </FormBtn>
              </form>
              
              {this.state.ingredients ? (
              <List>
                {this.state.ingredients.map(ingredients => {
                  return (
                    <ListItem key={ingredients._id}>
                      <a href={"/ingredients/" + ingredients._id}>
                        <strong>
                          {ingredients.name}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteIngredient(ingredients._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <div className="page-header">
              <h1>Recipes With Your Ingredients:</h1>

              <Row>
            <Col size="xs-12">
              {!this.state.recipes.length ? (
                <h1 className="text-center">No Recipes to Display</h1>
              ) : (
                <RecipeList>
                  {this.state.recipes.map(recipe => {
                    return (
                      <RecipeListItem
                        key={recipe.title}
                        title={recipe.title}
                        href={recipe.href}
                        ingredients={recipe.ingredients}
                        thumbnail={recipe.thumbnail}
                      />
                    );
                  })}
                </RecipeList>
              )}
            </Col>
          </Row>
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
