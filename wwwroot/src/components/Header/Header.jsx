import React from "react";
import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.header_main}>
      <div className={classes.left}>
        <span className={classes.light}></span>
      </div>
      <nav>
        <h3>Shop</h3>
        <span></span>
        <h3>Ginger Industries</h3>
        <a>Login</a>
      </nav>
    </header>
  );
};
