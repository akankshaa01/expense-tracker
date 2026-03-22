function Navbar({ activePage }) {
  return (
    <div className="navbar">
      <div className="logo"><h2>{activePage}</h2></div>
      
    </div>
  );
}
export default Navbar;