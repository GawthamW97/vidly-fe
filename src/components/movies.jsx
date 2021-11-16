import React, { Component } from "react";
import { Fragment } from "react";
import { toast } from "react-toastify";

import Pagination from "./common/pagination";
import Genres from "./common/listGroup";
import MoviesTable from "./moviesTable";

import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

import _ from "lodash";
import { Link } from "react-router-dom";
import Searchbox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    likedMovies: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: null,
    sortColumn: { path: "", order: "asc" },
    search: "",
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({
      movies,
      genres,
    });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("THis movie is already been deleted!");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === currentGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleChange = (query) => {
    this.setState({
      searchQuery: query,
      currentGenre: null,
      currentPage: 1,
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres: allGenres,
      currentGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    const { totalCount, data: movies } = this.getPageData();

    const { user } = this.props;
    return (
      <Fragment>
        <Fragment>
          <div className="row">
            <div className="col-2">
              <Genres
                items={allGenres}
                currentGenre={currentGenre}
                onGenreChange={this.handleGenreChange}
              />
            </div>
            <div className="col-10">
              {user && (
                <Link to="/movies/new" className="btn btn-primary mb-3">
                  New Movie
                </Link>
              )}
              <p>Showing {totalCount} in the database</p>
              <Searchbox value={searchQuery} onChange={this.handleChange} />
              <MoviesTable
                onSort={this.handleSort}
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </Fragment>
      </Fragment>
    );
  }
}

export default Movies;
