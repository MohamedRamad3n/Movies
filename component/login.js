import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { toast } from "react-toastify";
import Axios from "axios";
class Login extends Form {
  state = {
    data: { userName: "", password: "" },
    errors: {},
  };
  schema = {
    userName: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("password"),
  };
  doSubmit = async () => {
    try {
      const {
        data: { jwt },
      } = await Axios.post(
        "http://localhost/MoviesApis/MoviesApis/userApi/login.php",
        this.state.data
      );
      //console.log(jwt);
      localStorage.setItem("token", jwt);
      window.location="/";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data.message);
      }
      if (ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="w-25 m-auto">
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
