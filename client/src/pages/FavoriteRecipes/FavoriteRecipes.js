import React, { Component } from "react";
import API from "../../utils/API";
import './FavoriteRecipes.css';
import placeholder from '../../assets/placeholder.png';
import RecipeCard from "../../components/RecipeCard";
import CardWrapper from "../../components/CardWrapper";

class FavoriteRecipes extends Component {
    state = {
      currentPage: "FavoriteRecipes",
      faves: [],
      username: ""
    };
     
  componentDidMount() {
    this.loadFaves();
  }

  loadFaves = () => {
    API.getFaves(this.props.user.username)
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
    console.log('PROPS ', this.props)
    console.log('STATE ', this.state)
    return (
      <div>
        <h1>Favorite Recipes</h1>
        <CardWrapper>
          {this.state.faves.map(faves => {
            return (

              <RecipeCard key={faves._id}
                thumbnail={faves.thumbnail || placeholder}
                title={faves.title}
                ingredients={faves.ingredients}
                href={faves.href}
                id={faves._id}
                deleteFave={this.deleteFave}
              >
              </RecipeCard>

            )
          })}
        </CardWrapper>
      </div>
    );
  }
}

export default FavoriteRecipes;    
