import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import classes from "./Admin.module.scss";

export const Admin = () => {
  const location = useLocation();
  
  return (
    <div className={classes.admin_container}>
      <nav>
        <h3>Admin Navigation</h3>
        <Link
          className={`${
            location.pathname === "/admin" ? classes.selected : undefined
          }`}
          to="/admin"
        >
          Products
        </Link>
        <Link
          className={`${
            location.pathname === "/admin/order-processing" ? classes.selected : undefined
          }`}
          to="/admin/order-processing"
        >
          Orders
        </Link>
        <Link
          className={`${
            location.pathname === "/admin/users" ? classes.selected : undefined
          }`}
          to="/admin/users"
        >
          Users
        </Link>
      </nav>
      <div className={classes.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
