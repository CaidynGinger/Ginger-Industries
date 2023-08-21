import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import classes from "./Header.module.scss";

export const Header = () => {
  const { Auth, setAuth } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    console.log(Auth);
  }, [Auth]);
  const logoutHandler = () => {
    setAuth({});
    navigate("/");
  };
  return (
    <header className={classes.header_main}>
      <div className={classes.left}>
        <span className={classes.light}></span>
      </div>
      <nav>
        <h3>Shop</h3>
        <span></span>
        <h3>Ginger Industries</h3>
        <p className={classes.user_name}></p>
        {Auth?.userData?.UserInfo?.username && (
          <p className={classes.user_name}>{Auth.userData.UserInfo.username}</p>
        )}
        {!Auth?.userData?.UserInfo?.username && (
          <Link to={"/login"}>Login</Link>
        )}
        {Auth?.userData?.UserInfo?.username && (
          <a onClick={logoutHandler}>Logout</a>
        )}
      </nav>
    </header>
  );
};
