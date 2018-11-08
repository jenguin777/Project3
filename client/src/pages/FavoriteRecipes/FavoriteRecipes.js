import React, { Component } from "react";
// import Thumbnail from "../../components/Thumbnail";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";
import './FavoriteRecipes.css';
// import { RecipeList, RecipeListItem } from "../../components/RecipeList";

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
 
  render() {
    return (
  
  <Container fluid>
        <Row id="topRow">
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
    
