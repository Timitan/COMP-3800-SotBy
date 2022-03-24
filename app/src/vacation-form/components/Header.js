const Header = ({ title }) => {
  return (
    <header className="vacation-header">
      <h1 className="vacation-title">{title}</h1>
      <button className="vacation-back-btn" onClick={(e) => {window.location.href="/"}}>
        Back
      </button>
    </header>
  );
};

Header.defaultProps = {
    title: 'Vacation Submission Form',
}

export default Header;
