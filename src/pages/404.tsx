import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <NavLink to="/" className="btn btn-outline-dark px-4 py-2">
            Return to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
