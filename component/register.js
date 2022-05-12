import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { toast } from "react-toastify";
import Axios from "axios";
class Register extends Form {
  state = {
    data: { userName: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    userName: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("password"),
    name: Joi.string().required().label("name"),
  };
  doSubmit = async () => {
    try {
      await Axios.get(
        "http://localhost/MoviesApis/MoviesApis/userApi/register.php",
        this.state.data
      );
      toast.info(" user registered successfully");
      this.props.history.push("/login");
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    return (
      <div className="w-25 m-auto">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
