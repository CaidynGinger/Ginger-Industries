import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer";

import { Header } from "../Header/Header";
import { SubHeader } from "../SubHeader/SubHeader";
import { Carousel } from "../UI/Carousel/Carousel";
import classes from "./Main.module.scss";

export const Main = () => {
  const location = useLocation();
  return (
    <div className={classes.main}>
      <Header />

      <div className={classes.subHeader}>
        {location.pathname === "/" ? <Carousel /> : <></>}
        <SubHeader />
        <div className={classes.outlet}>
          <Outlet />
          <Footer/>
        </div>
      </div>
      
    </div>
  );
};
