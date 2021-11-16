import http from "./httpServices";

const api = "/movies";

function movieUrl(id) {
  return `${api}/${id}`;
}

export function getMovies() {
  return http.get(api);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(api, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
