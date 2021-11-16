import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (e) => {
    const { id, value } = e.currentTarget;

    const errors = { ...this.state.errors };

    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    const data = { ...this.state.data };
    data[id] = value;
    this.setState({ data, errors });
  };

  handleGenre = (e) => {
    const { id, value } = e.currentTarget;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    const data = { ...this.state.data };
    data[id] = { _id: Math.floor(Math.random() * 100) + 1, name: value };

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
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
        value={data[name]}
        label={label}
        list={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
