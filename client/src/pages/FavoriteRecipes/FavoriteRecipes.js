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
      faves: [],
    };

     
  componentDidMount() {
    this.loadFaves();
  }

  loadFaves = () => {
    API.getFaves()
      .then(res =>
        this.setState({ faves: res.data})
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

    if (this.state.title && this.state.href && this.state.ingredients && this.state.thumbnail) {
      API.saveFave({
        title: this.state.title, 
        href: this.state.href,
        ingredients: this.state.ingredients,
        thumbnail: this.state.thumbnail
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
            <img src={image} className="img-thumbnail" alt-text="recipe">
            </img>
                <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Fave Name"
                />
                <Input
                  value={this.state.href}
                  onChange={this.handleInputChange}
                  name="href"
                  placeholder="Link"
                />
                <Input
                  value={this.state.ingredients}
                  onChange={this.handleInputChange}
                  name="ingredients"
                  placeholder="Ingredients"
                />
                <Input
                  value={this.state.thumbnail}
                  onChange={this.handleInputChange}
                  name="thumbnail"
                  placeholder="Thumbnail"
                />
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
    
