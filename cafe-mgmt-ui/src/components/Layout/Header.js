import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>CaféTeria</h1>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Cafes
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Employees
            </NavLink>
          </li>
        </ul>
      </header>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
