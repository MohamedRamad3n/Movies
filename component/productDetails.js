const MovieDetails = (props) => {
  return <p> this is movie with the id : {props.match.params.id} </p>;
};
export default MovieDetails;
