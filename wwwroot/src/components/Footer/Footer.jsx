import React from "react";

import styles from "./Footer.module.scss";
// import openStackLogo from "../../assets/OpenStackLogo-white.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={`${styles.footer_container}`}>
          <h1>Ginger Industries</h1>
          <div>
            <h4>Links</h4>
            <Link to="/questions">Home</Link>
            <Link to="/questions">All Products</Link>
          </div>
          <div className={styles.external_links}>
            <a target="_blank" href="https://github.com/CaidynGinger/Ginger-Industries">Github</a>
          </div>
          <div className={styles.copywrite}>
            &copy; <em id="date"></em>Ginger Industries 2022
          </div>
        </div>
      </div>
    </footer>
  );
};
