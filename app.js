import "./App.css";
import React, { Component } from "react";
import { getMovies } from "./services/movieData";
import Like from "./component/like";
import ListGroup from "./component/listgroup";
import Pagination from "./component/pagination";
import { paginate } from "./component/paginate";
import { Link } from "react-router-dom";
import { getGenres } from "./services/genersData";
import Axios from "axios";
import { toast } from "react-toastify";
class App extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
  };
  async componentDidMount() {
    const {
      data: { body },
    } = await getGenres();
    const genres = [{ name: "ALL" }, ...body];
    const {
      data: { body: MoviesData },
    } = await getMovies();
    this.setState({ movies: MoviesData, genres });
  }
  delete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
    try {
      await Axios.delete(
        `http://localhost/MoviesApi/MoviesApis/api/delete.php`,
        { data: { _id: movie._id } }
      );
      toast.info("post deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.state === 404)
        toast.error("this post is already deleted");
      else {
        console.log(ex);
        toast.error("unexpected error occurred");
      }
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  pageChange = (page) => {
    this.setState({ currentPage: page });
  };
  genreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter((m) => m.genre._id === selectedGenre._id)
        : this.state.movies;
    if (count === 0) {
      return <p className="display-5 text-center">there's no movies yet</p>;
    }
    const movies = paginate(
      filtered,
      this.state.currentPage,
      this.state.pageSize
    );
    return (
      <main className="container">
        <p className="text-center">there's {filtered.length} items</p>
        <div className="row">
          <div className="col-3 mt-5">
            <ListGroup
              genres={this.state.genres}
              genreSelect={this.genreSelect}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col-9">
            <Link
              to="/movies/new"
              className="btn btn-secondary"
              style={{
                margin: "20px auto",
                display: "block",
                width: "120px",
                height: "50px",
              }}
            >
              New Movie
            </Link>
            <table className="table table-hover table-stripped border mt-5">
              <thead>
                <tr>
                  <th>title</th>
                  <th>genre</th>
                  <th>numberInStock</th>
                  <th>dailyRentalRate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        like={movie.like}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.delete(movie)}
                        className="btn btn-outline-warning"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                    <td>
                      <Link
                        className="btn btn-danger"
                        to={`/movies/${movie._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              pageSize={this.state.pageSize}
              noOfPage={filtered.length}
              pageChange={this.pageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </main>
    );
  }
}
export default App;
