import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, FormBtn} from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import image from '../../assets/PastaPic.jpg';
import './PersonalRecipe.css';

class PersonalRecipe extends Component {
  state = {
    title: "",
    name: "",
    ingredients: "",
    instructions: "",
    username: ""
  };
 
  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    API.getRecipes(this.props.user.username)
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
      console.log(this.props)
      API.saveRecipe({
        title: this.state.title, 
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        username: this.props.user.username
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };
 
  render() {
    return (
      <Container fluid>
        <Row id="topRow">
          <Col size="md-6">
            <img src={image} className="img-thumbnail" alt="recipe">
            </img>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Recipe Name"
                  inputvalue=""
                />
                <Input
                  value={this.state.ingredients}
                  onChange={this.handleInputChange}
                  name="ingredients"
                  placeholder="Ingredients"
                  inputvalue=""
                />
              </form>

              <form>
                <div className="form-group">
                  <textarea
                    className="form-control" rows="5" id="instructionsInput"
                    value={this.state.instructions}
                    onChange={this.handleInputChange}
                    name="instructions"
                    placeholder="Instructions">
                  </textarea>
                </div>
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Recipe
                </FormBtn>
              </form>
          </Col>

        <Col size="md-6 sm-12">
          <Container>
          <h1 id="savedRecipesHeader">&emsp;Saved Personal Recipes</h1>
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
            </Container>
        </Col>
      </Row>
    </Container>
        );
    }
}

export default PersonalRecipe;