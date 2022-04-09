const Header = ({ title }) => {
    return (
      <header className="create-course-header">
        
        <h1 className="create-course-title">{title}</h1>
        <button className="create-course-back-btn" onClick={(e) => {window.location.href="/"}}>
          Back
        </button>
      </header>
    );
  };
  
  Header.defaultProps = {
      title: 'Create Course Form',
  }
  
  export default Header;