import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { RecipeList, RecipeListItem } from "../../components/RecipeList";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn} from "../../components/Form";
import './ingredients.css';
import { InputGroup } from "../../components/Form/InputGroup";

class Ingredients extends Component {
  state = {
    name: "",
    addIngr: "",
    recipes: [],
    chosenIngred: [],
    allIngred: "",
    recipeSearch: ""
  };

  componentDidMount() {
    this.loadIngredients();
    // this.loadApiRecipes();
  };

  // loadApiRecipes = () => {
  //   API.getApiRecipes(this.state.chosenIngred)
  //     .then(res => this.setState({ recipes: res.data }))
  //     .catch(err => console.log(err));
  // };

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

    if (this.state.addIngr) {
      API.saveIngredient({
        name: this.state.addIngr
      })
        .then(res => {
          this.loadIngredients()
          this.setState({addIngr: ""})
        })
        .catch(err => console.log(err));
    }
  };

  handleRecipeInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRecipeFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    console.log('EVENT ', event.target)
    API.getApiRecipes(this.state.recipeSearch)
      .then(res => {
        this.setState({ recipes: res.data })
        console.log('res ', res.data)
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log('PROPS ', this.props)
    console.log('STATE ', this.state)
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <div className="page-header">
              <h1>&emsp;Add An Ingredient</h1>
              <form>
                <InputGroup
                  addIngr={this.state.addIngr}
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  disabled={!(this.state.name)}
                  placeholder={"Ingredient (required)"}
                  btnText={"Submit"}
                />

{/*
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
*/}
              </form><br/>
              <h1>&emsp;Ingredients On-Hand:</h1>
              {this.state.ingredients ? (
              <List>
                {this.state.ingredients.map(ingredients => {
                  return (
                    <ListItem key={ingredients._id}>
                      <p>
                        <input 
                          type="checkbox" 
                          name={this.state.chosenIngred} 
                          value={ingredients.name} 
                          onClick={(value) => {this.setState(prevState => ({
                            chosenIngred: [...prevState.chosenIngred, value]
                          }))}}
                        /> &emsp;
                        <strong>
                          {ingredients.name}
                        </strong>
                        <DeleteBtn 
                          onClick={() => this.deleteIngredient(ingredients._id)} 
                        />
                      </p>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Ingredients to Display</h3>
            )}
          
            </div>
          </Col>

          <Col size="md-6 sm-12">
            <Container>
              <div className="page-header">
                <h1>&emsp;Find Recipes:</h1>
                <form className="form-inline my-2 my-lg-0">
                  <div className="input-group mb-3">
                    <select defaultValue="Checked" className="custom-select" id="inputGroupSelectSearch" aria-label="Example select with button addon">
                      <option value="Checked">Checked Ingredient(s)</option>
                      <option value="All">All Ingredient(s)</option>
                      <option value="Custom">Enter Other Ingredient(s)</option>
                    </select>
                    <input type="text" size="65" class="form-control" value="" placeholder="...or type other ingredients list here" aria-label="Text input with dropdown button"/>
                    <div className="input-group-append">
                      <button className="btn btn-success" onClick={this.handleRecipeFormSubmit} type="success">Search</button>
                    </div>
                  </div>
                  {/*<button className="btn btn-outline-danger my-2 my-sm-0" onClick={() => this.handleFormSubmit2()} type="submit">Search</button>*/}
                </form><br/>
                <h1>&emsp;Recipe Results:</h1>
              

  {/*
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="recipeSearch"
                        value={this.state.recipeSearch}
                        onChange={this.handleRecipeInputChange}
                        placeholder="Search For a Recipe"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <FormBtn
                        onClick={this.handleRecipeFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </FormBtn>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
              <Row>
                <Col size="xs-12">
      */}
                  {!this.state.recipes.length ? (
                    <h5 className="text-center">No Recipes to Display</h5>
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
                </div>
          {/*        
                </Col>
              </Row>
          */}
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ingredients;
