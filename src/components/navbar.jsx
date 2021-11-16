import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <NavLink className="nav-item nav-link" to="/">
              Movies
            </NavLink>
            <NavLink className="nav-item nav-link" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-item nav-link" to="/rentals">
              Rentals
            </NavLink>
            {!user && (
              <Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </Fragment>
            )}
            {user && (
              <Fragment>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
