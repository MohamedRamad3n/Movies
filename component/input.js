const Input = ({  name, label, error,...other }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={name}
          className="form-control"
          name={name}
          {...other}
        />
        {error && <div className="alert alert-danger ">{error}</div>}
      </div>
    );
  };
  
  export default Input;
  