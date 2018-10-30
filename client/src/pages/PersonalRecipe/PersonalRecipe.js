import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, FormBtn} from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

class PersonalRecipe extends Component {
  state = {
    // recipes: [],
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
        this.setState({ recipes: res.data, title: "", ingredients: "", instructions: "" })
      )
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
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

    if (this.state.title && this.state.ingredients && this.state.instructions) {
      API.saveRecipe({
        title: this.state.title, 
        ingredients: this.state.ingredients,
        instructions: this.state.instructions
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };
 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <img src="../assets/favicon.ico" className="img-thumbnail" alt="Responsive image" alt-text="recipe">
            </img>
          </Col>
          <Col size="md-8">
          <form>
          <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Recipe Name"
                />
                <Input
                  value={this.state.ingredients}
                  onChange={this.handleInputChange}
                  name="ingredients"
                  placeholder="Ingredients"
                />
                <Input
                  value={this.state.instructions}
                  onChange={this.handleInputChange}
                  name="instructions"
                  placeholder="Instructions"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Recipe
                </FormBtn>
              </form>
            {/* <div className="form-group">
              <label for="formGroupExampleInput">Recipe Name</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Spaghetti Carbonara"/>
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput">Time to Prepare</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="90 minutes"/>
            </div> */}
          </Col>
        </Row>

        {this.state.recipes ? (
              <List>
                {this.state.recipes.map(recipes => {
                  return (
                    <ListItem key={recipes._id}>
                      <a href={"/recipes/" + recipes._id}>
                        <strong>
                          {recipes.title}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteRecipe(recipes._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Recipes to Display</h3>
            )}
        {/* <Row>
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
        </Row> */}
        {/* <Row>
          <Col size="md-12">
          <div className="form-group">
            <label for="instructions">Recipe Instructions</label>
            <textarea className="form-control" rows="10" id="instructions"></textarea>
          </div>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default PersonalRecipe;
