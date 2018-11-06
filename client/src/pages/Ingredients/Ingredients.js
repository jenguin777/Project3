import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { RecipeList, RecipeListItem } from "../../components/RecipeList";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn} from "../../components/Form";
import './ingredients.css';
import { InputGroup } from "../../components/Form/InputGroup";
import CheckBtn from "../../components/CheckBtn";

let ing = []

class Ingredients extends Component {
  state = {
    name: "",
    addIngr: "",
    recipes: [],
    chosenIngred: [],
    allIngred: [],
    othIngr: "",
    recipeSearch: ""
  };

  componentDidMount() {

    //Set all ingredients.selected to false when page first loads
    //until a way is found to check the checkboxes for the ones that are true.
    API.updateIngredients({
      selected: true,
      $set: { selected : false }
    })
    .then(res => {
      console.log("All ingredients.selected set to false");
    })
    .catch(err => console.log(err));

    this.loadIngredients();
   
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
        this.setState({recipes: res.data})
        this.setState({othIngr: ""});
        console.log('res ', res.data)
        console.log("othIngr ", this.state.othIngr)
      })
      .catch(err => console.log(err));
  };

/*  
  //put ingredients into ing array
  chosenIngredients = id => {
    API.getIngredient(id)
    .then(res => {
      ing.push(res.data.name)
      this.setState({ chosenIngred: ing})
      console.log("ING =", ing)
    })
    .catch(err => console.log(err));
  };
*/

//put ingredients into ing array
chosenIngredients = id => {
  console.log("id = " + id)
  API.getIngredient(id)
  .then(res => {
    console.log("res.data = " + JSON.stringify(res.data))
    console.log("res.data.selected = " + res.data.selected)
    if (!res.data.selected) {
      ing.push(res.data.name)
      this.setState({ chosenIngr: ing})
      console.log("ING = " + ing)
    /*  
      API.updateIngredient(id, {
        selected: true
      })
      .then(res => {
        console.log("Ingredient was updated");
      })
      .catch(err => console.log(err));
    */
    } else {
      ing.pop(res.data.name)
      this.setState({ chosenIngr: ing})
      console.log("ING = " + ing)
    /*  
      API.updateIngredient(id, {
        selected: false
      })
      .then(res => {
        console.log("Ingredient was updated");
      })
      .catch(err => console.log(err));
    */
    }
  })
  .catch(err => console.log(err));
} 


  searchWithChosen = event => {
    event.preventDefault();
    console.log(ing)
    console.log('EVENT ', event.target)
    API.getApiRecipes(this.state.chosenIngred.join(", "))
      .then(res => {
        this.setState({ recipes: res.data })
        console.log('res ', res.data)
      })
      .catch(err => console.log(err));
      console.log("clicked 'Search with all'");
    };

  searchWithAll = event => {
    event.preventDefault();
    console.log(ing)
    console.log('EVENT ', event.target)
    API.getApiRecipes(this.state.allIngred.join(", "))
      .then(res => {
        this.setState({ recipes: res.data })
        console.log('res ', res.data)
      })
      .catch(err => console.log(err));
      console.log("clicked 'Search with all'");
  };

  searchWithOther = event => {
    event.preventDefault();
    console.log(ing)
    console.log('EVENT ', event.target)
    console.log("Using othIngred:  " + this.state.othIngred);
    API.getApiRecipes(this.state.othIngr)
    .then(res => {
      this.setState({ recipes: res.data })
      console.log('res ', res.data)
    })
    .catch(err => console.log(err));
  };

  newFave = id => {
    API.saveFave(id)
      .then(res => this.loadIngredients())
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
            {/*
                <div className="input-group mb-3">
                  <input type="text" name="addIngr" value={this.addIngr} onChange={this.handleInputChange} className="form-control" placeholder="Ingredient (required)" />&emsp;
                  <button className="btn btn-success" onClick={this.handleFormSubmit} type="button" id="button-submit">Submit</button>
                </div>
            */}

               <InputGroup
                  addIngr={this.state.addIngr}
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  placeholder={"Ingredient (required)"}
                  btnText={"Submit"}
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
                <h3>No Ingredients to Display</h3>
              </List>
            )}

            </div>
          </Col>
 
          <Col size="md-6 sm-12">
            <Container>
              <div className="page-header">
                <h1>&emsp;Find Recipes from Ingredients:</h1>
      {/*
                <Row>
                <Col size="md-2">
                  <button className="btn btn-success" id="swALL" onClick={this.searchWithAll} type="button">Search All</button>&emsp;
                </Col>
                <Col size="md-2">
                  <button className="btn btn-success" id="swCHK" onClick={this.searchWithChosen} type="button">Search Checked</button>
                </Col>

                <Col size="md-6">
                  <input type="text" name="othIngr" value={this.othIngr} onChange={this.handleRecipeInputChange} className="form-control othIngrTB" placeholder="search other" />&emsp;
                </Col>
                <Col size="md=2">  
                  <button className="btn btn-success" onClick={this.searchWithOther} type="button" id="button-submit">Submit</button>
                </Col>
                </Row>
      */}

                <div className="input-group mb-3">
                  <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-info" type="button" onClick={this.searchWithAll}>Search All</button>
                    <button className="btn btn-primary" type="button" onClick={this.searchWithChosen}>Search Checked</button>
                  </div>
                  <input type="text" name="othIngr" value={this.state.othIngr} onChange={this.handleOthIngrChange} className="form-control" placeholder="or type other ingredients here..." />
                  
                  <div className="input-group-append">
                    <button className="btn btn-success" onClick={this.searchWithOther} type="button" id="button-addon2">Search</button>
                  </div>
                </div>


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
                            onClick={() => this.newFave(recipe)}
                            >
                        </RecipeListItem>
                        
                        );
                      })}
                    </RecipeList>
                  )}
                </div>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Ingredients;
