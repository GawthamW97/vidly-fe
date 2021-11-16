import React, { Fragment, Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Customer from "./components/customers";
import Rentals from "./components/rentals";
import MovieForms from "./components/movieForms";
import Notfound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container mt-4">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForms} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            {/* <Route path="/movies/:id" component={AddMovie} /> */}
            <Redirect exact from="/" to="/movies" />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={Notfound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
