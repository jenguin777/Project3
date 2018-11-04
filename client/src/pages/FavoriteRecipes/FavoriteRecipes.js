import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, FormBtn} from "../../components/Form";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import image from '../../assets/PastaPic.jpg';
import './FavoriteRecipes.css';

class FavoriteRecipes extends Component {
    state = {
      currentPage: "FavoriteRecipes",
      name: "",
      addIngr: "",
      faves: [],
    };

     
  componentDidMount() {
    this.loadFaves();
  }

  loadFaves = () => {
    API.getFaves()
      .then(res =>
        this.setState({ faves: res.data, title: "", ingredients: "", instructions: "" })
      )
      .catch(err => console.log(err));
  };

  deleteFave = id => {
    API.deleteFave(id)
      .then(res => this.loadFaves())
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
      API.saveFave({
        title: this.state.title, 
        ingredients: this.state.ingredients,
        instructions: this.state.instructions
      })
        .then(res => this.loadFaves())
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
                    placeholder="Fave Name"
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
                        className="form-control" rows="10" id="instructionsInput"
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
                      Submit Favorite Recipe
                    </FormBtn>
                </form>
            </Col>

        <Col size="md-6 sm-12">
          <Container>
          <h1 id="savedFavesHeader">&emsp;Favorite Recipes</h1>
            {this.state.faves ? (
                  <List>
                    {this.state.faves.map(faves => {
                      return (
                        <ListItem key={faves._id}>
                          <a href={"/faves/" + faves._id}>
                            <strong>
                              {faves.title}
                            </strong>
                          </a>
                          <DeleteBtn onClick={() => this.deleteFave(faves._id)} />
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <h3>No Favorites to Display</h3>
                )}
            </Container>
        </Col>
      </Row>
    </Container>
        );
    }
}
    export default FavoriteRecipes;
    
