const Header = ({ title }) => {
    return (
      <header className="create-user-header">
        <h1 className="create-user-title">{title}</h1>
        <button className="create-user-back-btn" onClick={(e) => {window.location.href="/"}}>
          Back
        </button>
      </header>
    );
  };
  
  Header.defaultProps = {
      title: 'Create User Form',
  }
  
  export default Header;
  