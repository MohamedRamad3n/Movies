import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/app">
            Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/aboutUS">
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contactUS">
            contact Us
          </NavLink>
        </li>
        {!user && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
