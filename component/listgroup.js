import "./listgroup.css";
const ListGroup = (props) => {
  const { genres, genreSelect, selectedGenre, name, id } = props;
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[id]}
          onClick={() => genreSelect(genre)}
          className={
            selectedGenre === genre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[name]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  name: "name",
  id: "_id",
};
export default ListGroup;
