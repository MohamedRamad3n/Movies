import React, { Component } from "react";
import App from "./app";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./component/notFound";
import AboutUs from "./component/aboutUs";
import ContactUs from "./component/contactUs";
import Login from "./component/login";
import Logout from "./component/logout";
import Register from "./component/register";
import NavBar from "./component/navBar";
import MovieForm from "./component/movieForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
class BigApp extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const data = jwtDecode(jwt);
      const user = data.data;
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/app" component={App} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/contactUs" component={ContactUs} />
          <Redirect from="/" exact to="/app" />
          <Redirect to="/notFound" />
        </Switch>
      </>
    );
  }
}

export default BigApp;
