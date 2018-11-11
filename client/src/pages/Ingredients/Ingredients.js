import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { RecipeList, RecipeListItem } from "../../components/RecipeList";
import { List, ListItem } from "../../components/List";
import './ingredients.css';
import { InputGroup } from "../../components/Form/InputGroup";
import placeholder from "../../assets/placeholder.png";

class Ingredients extends Component {
  state = {
    name: "",
    addIngr: "",
    recipes: [],
    othIngr: "",
    recipeSearch: "",
    username: "",
    lastAPICall: "",
    heartClass: "far fa-heart"
  };

  componentDidMount() {
    this.loadIngredients();
  };

  loadIngredients = () => {
    API.getIngredients(this.props.user.username)
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

  handleOthIngrChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.addIngr) {
      API.saveIngredient({
        name: this.state.addIngr,
        username: this.props.user.username
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
        this.setState({recipes: res.data})
        this.setState({othIngr: ""});
      })
      .catch(err => console.log(err));
  };

  // When checkbox is checked, change ingredient.selected to true
  chosenIngredients = id => {
    API.getIngredient(id)
    .then(res => {
      if (!res.data.selected) {
        API.updateIngredient(id, {
          selected: true
        })
        .then(res => {
          this.loadIngredients()
          console.log("Ingredient was updated");
        })
        .catch(err => console.log(err));
      } else {
        API.updateIngredient(id, {
          selected: false
        })
        .then(res => {
          this.loadIngredients()
          console.log("Ingredient was updated");
        })
        .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  }; 

  // Search API with checked ingredients

  searchWithChosen = event => {
    event.preventDefault();
    // first, build chosenIngred String from ingredients.selected
    let chosenIngred = "";
    let firstTime = true;
    this.state.ingredients.map(i => {
      if (i.selected === true) {
        if (firstTime === true) {
          firstTime = false;
          chosenIngred = i.name;
        } else {
          chosenIngred = chosenIngred + ", " + i.name;
        }
      }
    });
    // then use chosenIngred String to call API
    console.log("You clicked Search Checked:  " + chosenIngred);
    this.setState({lastAPICall: chosenIngred})
    API.getApiRecipes(chosenIngred)
      .then(res => { 
        this.setState({ recipes: res.data })
        console.log('res ', res.data)
      })
      .catch(err => console.log(err));
  };

  // Search API with all ingredients
  searchWithAll = event => {
    event.preventDefault();
    // first, build allIngred String from ingredients
    let allIngred = "";
    let firstTime = true;
    this.state.ingredients.map(i => {
      if (firstTime === true) {
        firstTime = false;
        allIngred = i.name;
      } else {
        allIngred = allIngred + ", " + i.name;
      }
    });
    // then use allIngred String to call API
    console.log("You clicked Search All:  " + allIngred);
    this.setState({lastAPICall: allIngred})
    API.getApiRecipes(allIngred)
      .then(res => {
        this.setState({ recipes: res.data })
      })
      .catch(err => console.log(err));
  };

  // Search API with Other Ingredients from textbox
  searchWithOther = event => {
    event.preventDefault();
    console.log("You clicked Search (other):  " + this.state.othIngred);
    this.setState({lastAPICall: this.state.othIngred})
    API.getApiRecipes(this.state.othIngr)
    .then(res => {
      this.setState({ recipes: res.data })
    })
    .catch(err => console.log(err));
  };

  newFave = index => {
    console.log("Hey, I'm getting ready to save a recipe with index = " + index);
    const recipe = this.state.recipes[index];
    // const username = this.state.user.username;
    recipe.username = this.props.user.username;
    API.saveFave(recipe)
      .then(res => this.loadIngredients())
      .catch(err => console.log(err));
  };

  render() {
    console.log('PROPS ', this.props)
    console.log('STATE ', this.state)
    return (
      <Container fluid>
        <Row>

        {/* First Column Begins Here */}  
          <Col size="lg-6 md-12">
            <div className="page-header">
              <h1>&emsp;Add An Ingredient</h1>
              <form>
               <InputGroup
                  addIngr={this.state.addIngr}
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  handleEnterKey={this.handleEnterKey}
                  placeholder={"Ingredient (required)"}
                  btnText={"Submit"}
                  className={"btn btn-color1"}
                />
              </form>
              <br/>
              <h1>&emsp;Ingredients On-Hand:</h1>
              {this.state.ingredients ? (
              <List>
                {this.state.ingredients.map(ingredients => {
                  return (
                    <ListItem key={ingredients._id}>
                      <p>
                        {/* Checkbox is first thing */}
                        <input 
                          type="checkbox"
                          defaultChecked={ingredients.selected}
                          onClick={() => this.chosenIngredients(ingredients._id)}
                        /> &emsp;
                        {/* Ingredient name is second thing */}
                        <strong>
                          {ingredients.name}
                        </strong>
                        {/* Delete button is final thing */}
                        <DeleteBtn onClick={() => this.deleteIngredient(ingredients._id)} />
                      </p>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <List>
                <h5 className="text-blue">No Ingredients to Display</h5>
              </List>
            )}
            </div>
          </Col><br/>

        {/* Second Column Begins Here */}
          <Col size="lg-6 md-12">

              <div className="page-header">
                <h1>&emsp;Find Recipes:</h1>
                <div className="input-group mb-3">
                  <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-color1" type="button" onClick={this.searchWithAll}>Search All</button>
                    <button className="btn btn-color2" type="button" onClick={this.searchWithChosen}>Search Checked</button>
                  </div>
                  <input type="text" name="othIngr" value={this.state.othIngr} onChange={this.handleOthIngrChange} className="form-control" placeholder="item1, item2, etc." />
                  
                  <div className="input-group-append">
                    <button className="btn btn-color1" onClick={this.searchWithOther} type="button" id="button-addon2">Search</button>
                  </div>
                </div>
                  {!this.state.recipes.length ? (
                    <h5 className="text-blue">No Recipes to Display</h5>
                  ) : (
                    <div>
                      <p className="little-note">Add to Favorites</p>
                      <div className="clear-float"></div>
                      
                    <RecipeList>
                      {this.state.recipes.map((recipe, index )=> {
                        return (
                          
                          <RecipeListItem
                            index = {index}
                            key={recipe.title}
                            title={recipe.title}
                            href={recipe.href}
                            ingredients={recipe.ingredients}
                            thumbnail={recipe.thumbnail || placeholder}
                            className={this.state.heartClass}
                            onClick={ this.newFave }
                          >
                        </RecipeListItem>
                        
                        );
                      })}
                    </RecipeList>
                    </div>
                  )}
                </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ingredients;
