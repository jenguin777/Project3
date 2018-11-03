import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { RecipeList, RecipeListItem } from "../../components/RecipeList";
import List  from "../../components/List";
import ListItem from '../../components/List/ListItem';
import { Input, TextArea, FormBtn} from "../../components/Form";
import { InputGroup } from "../../components/Form/InputGroup";
import './FavoriteRecipes.css';

class FavoriteRecipes extends Component {
    state = {
      currentPage: "FavoriteRecipes",
      name: "",
      addIngr: "",
      recipes: [],
      chosenIngred: [],
      allIngred: "",
      recipeSearch: ""
    };
 /* 
    componentDidMount() {
      this.loadIngredients();
      // this.loadApiRecipes();
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
      };
    
      renderPage = () => {
        if (this.state.currentPage === "FavoriteRecipes") {
          return <FavoriteRecipes />;
        } else if (this.state.currentPage === "PersonalRecipes") {
          return <PersonalRecipes />;
        } else if (this.state.currentPage === "PersonalRecipe") {
          return <PersonalRecipe />;
        }
      };
*/
      render() {
        return (
          <div>

          </div>
        );
      }
    }

    export default FavoriteRecipes;
    
