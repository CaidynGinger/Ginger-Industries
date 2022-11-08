import React, { useState } from "react";

import classes from "./Carousel.module.scss";

import img1 from "../../../assets/img/ships/400i_Explore_2_092021.jpg";
import img2 from "../../../assets/img/ships/ARGO-SRV_PROMO_Cargo_Sm01_CC-Min.jpg";
import img3 from "../../../assets/img/ships/elliot-davis-render1.jpg";
import img4 from "../../../assets/img/ships/star-citizen-sea-island-spaceship-wallpaper.jpg";
import img5 from "../../../assets/img/ships/emmanuel-shiu-vtol-008-2k.jpg";
import { Button } from "../Button/Button";

export const Carousel = () => {
  const images = [img1, img2, img3, img4, img5];

  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  const slideFactory = (img) => {
    return (
      <div
        className={classes.img}
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${img})`,
        }}
      >
        <div className={`${classes.slider_information} ${classes.row}`}>
          <div className={classes.product_card}>
            <h3>Product name</h3>
            <h4>Shit type</h4>
            <div className={classes.price}>
              <div className={classes.main_price}>
                <ion-icon name="logo-electron"></ion-icon>
                <h3>103</h3>
              </div>
              <p>.50 GSC</p>
              <div className={classes.discount}>
                <span></span>
                <div className={classes.price_discount}>
                  <ion-icon name="logo-electron"></ion-icon>
                  <h3>123</h3>
                  <p>.50 GCY</p>
                </div>
              </div>
            </div>
            <h5>Save 20%</h5>
            <div className={classes.buttons}>
              <a>MORE INFO</a>
              <Button>Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.carousel}>
      <span
        onClick={prevSlide}
        className={`${classes.left_arrow_styles} ${classes.arrow_style}`}
      >
        ❮
      </span>
      <span
        onClick={nextSlide}
        className={`${classes.right_arrow_styles} ${classes.arrow_style}`}
      >
        ❯
      </span>
      {images.map((img, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? `${classes.slide} ${classes.active}`
                : `${classes.slide}`
            }
          >
            {index === current && slideFactory(img)}
          </div>
        );
      })}
    </div>
  );
};
