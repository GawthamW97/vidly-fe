import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";
class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genre: { _id: "", name: "" },
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genre: {
      _id: Joi.number().required(),
      name: Joi.string().required().label("Genre"),
    },
    numberInStock: Joi.number().required().integer().min(0).label("In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .integer()
      .min(1)
      .max(10)
      .label("Rate"),
  };

  doSubmit = () => {
    console.log("Submitted!");
  };

  render() {
    console.log(this.state.data);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genre", "Genre", [
            "Action",
            "Thriller",
            "Comedy",
          ])}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
