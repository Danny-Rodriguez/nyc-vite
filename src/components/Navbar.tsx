import { NavLink } from "react-router-dom";

// Define the props interface for the Navbar component
interface NavbarProps {
  getCartTotal: () => number;
}

function Navbar({ getCartTotal }: NavbarProps) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold fs-5 brand" to="/">
            NEW YORK COLLECTION{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-bag-fill mb-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
            </svg>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-cy="navbar-toggler"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" data-cy="navbar-content">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0" data-cy="navbar-links">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" data-cy="nav-link-home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products" data-cy="nav-link-products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" data-cy="nav-link-about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" data-cy="nav-link-contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons" data-cy="navbar-buttons">
              <button className="btn">
                <NavLink to="/cart" className="btn btn-outline-dark ms-2" data-cy="nav-link-cart">
                  <i className="fa fa-shopping-cart me-1"></i> Cart (
                  {getCartTotal()})
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
