import Axios from "axios";
export function getMovies() {
  return Axios.get("http://localhost/MoviesApis/MoviesApis/api/read.php");
}

export function getMovie(movieId) {
  return Axios.get(
    `http://localhost/MoviesApis/MoviesApis/api/singleRead.php?id=${movieId}`
  );
}
export function saveMovie(movie) {
  if (movie._id) {
    return Axios.put(
      `http://localhost/MoviesApis/MoviesApis/api/update.php`,
      movie
    );
  }
  return Axios.post(
    `http://localhost/MoviesApis/MoviesApis/api/create.php`,
    movie
  );
}
