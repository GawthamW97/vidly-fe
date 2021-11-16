import React, { Component } from "react";
import MovieForm from "./common/movieForm";

class AddMovie extends Component {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  render() {
    return (
      <div>
        <MovieForm movie={this.state.data} />
      </div>
    );
  }
}

export default AddMovie;
