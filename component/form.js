import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validateProperty = ({ name, value }) => {
    const singleData = { [name]: value };
    const singleSchema = { [name]: this.schema[name] };
    const result = Joi.validate(singleData, singleSchema);
    if (!result.error) return null;
    else return result.error.details[0].message;

    /*
        if (name === "userName") {
          if (value.trim() === "") return "user name is required";
        }
        if (name === "password") {
          if (value.trim() === "") return "password is required";
        }
        */
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    /*
        const errors = {};
        const { data } = this.state;
        if (data.userName.trim() === "") errors.userName = "username Required";
        if (data.password.trim() === "") errors.password = "password Required";
        return Object.keys(errors).length === 0 ? null : errors;
        */
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        options={options}
      />
    );
  }
}

export default Form;
