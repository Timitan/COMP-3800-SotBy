const Header = ({ title }) => {
  return (
    <header className="create-resource-header">
      <h1 className="create-resource-title">{title}</h1>
      <button className="create-resource-back-btn" onClick={(e) => {window.location.href="/"}}>
        Back
      </button>
    </header>
  );
};

Header.defaultProps = {
    title: 'Create Resource Form',
}

export default Header;
