import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./SubHeader.module.scss";

export const SubHeader = () => {
  const location = useLocation();
  //   console.log(location.pathname);

  const [NavCss, setNavCss] = useState(
    `${classes.header}`
  );

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(location.pathname);
    console.log(scrollPosition);
    if (scrollPosition >= 600) {
      setNavCss(`${classes.header}`);
    } if(location.pathname === '/' && scrollPosition < 600) {
        setNavCss(`${classes.header} ${classes.not_fixed}`);
    } else {
      setNavCss(`${classes.header}`);
    }
  }, [scrollPosition, location.pathname ]);
  

  return (
    <>
    {scrollPosition >= 600 && <div className={classes.spacer}></div>}
    
    <div className={NavCss}>
      <div className={classes.left}>
        <span className={classes.light}></span>
      </div>
      <nav>
        <Link className={`${ location.pathname === '/' ? classes.selected : undefined}`} to="/">Home</Link>
        <Link className={`${ location.pathname === '/all-products' ? classes.selected : undefined}`} to="/all-products">All Products</Link>
      </nav>
      <div className={classes.right}>
        <span className={classes.light}></span>
      </div>
    </div>
    </>
    
  );
};
