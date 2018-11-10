import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Ingredients from './pages/Ingredients';
import Detail from "./pages/Detail";
import FavesDetail from "./pages/FavesDetail";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import PersonalRecipe from "./pages/PersonalRecipe";
import FavoriteRecipes from "./pages/FavoriteRecipes";

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log('successfully logged out!');
			console.log(response.status);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}

		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
        { this.state.loggedIn && (
          <div>
            <Nav user={this.state.user} logout={this.logout}/>
            <div className="main-view">
							<Switch>
                <Route exact path="/" component={() => <Ingredients user={this.state.user}/>} />
                <Route exact path="/ingredients" component={() => <Ingredients user={this.state.user}/>} />
                <Route exact path="/recipes/:id" component={(props) => <Detail user={this.state.user} {...props}/>} />
								<Route exact path="/faves/:id" component={(props) => <FavesDetail user={this.state.user} {...props}/>} />
								<Route exact path="/personalrecipe" component={() => <PersonalRecipe user={this.state.user}/>} />
								<Route exact path="/favoriterecipes" component={() => <FavoriteRecipes user={this.state.user}/>} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        )}
        { !this.state.loggedIn && (
          <div className="auth-wrapper" style={{paddingTop:40}}>
            <Route exact path="/" component={() => <LoginForm login={this.login}/>} />
            <Route exact path="/ingredients" component={() => <LoginForm login={this.login}/>} />
						{/* <Route exact path="/recipes/:id" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/faves/:id" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/personalrecipe" component={() => <LoginForm login={this.login}/>} />
						<Route exact path="/favoriterecipes" component={() => <LoginForm login={this.login}/>} /> */}
            <Route exact path="/signup" component={SignupForm} />
          </div>
        )}
			</div>
		)
	}
}

export default App;
