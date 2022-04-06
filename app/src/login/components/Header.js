const Header = ({ title }) => {
    return (
      <header className="login-header">
        
        <h1 className="login-title">{title}</h1>
        <button className="login-back-btn" onClick={(e) => {window.location.href="/"}}>
          Back
        </button>
      </header>
    );
  };
  
  Header.defaultProps = {
      title: 'Login Form',
  }
  
  export default Header;
  