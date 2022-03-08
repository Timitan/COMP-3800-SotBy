const TextInput = ({ text, size }) => {
  if (text) {
    return (
      <form className="add-form">
        <div className="form-control">
          <label>{text}</label>
          <input type="text" placeholder={text + "..."} />
        </div>
      </form>
    );
  } else {
    return (
      <form className="add-form">
        <div className={size}>
          <input type="text" placeholder="..." />
        </div>
      </form>
    );
  }
};

TextInput.defaultProps = {
  size: "form-control",
};

export default TextInput;
