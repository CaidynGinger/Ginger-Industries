import React, { useEffect, useState } from "react";

import classes from "./Carousel.module.scss";

import img1 from "../../../assets/img/ships/400i_Explore_2_092021.jpg";
import img2 from "../../../assets/img/ships/ARGO-SRV_PROMO_Cargo_Sm01_CC-Min.jpg";
import img3 from "../../../assets/img/ships/elliot-davis-render1.jpg";
import img4 from "../../../assets/img/ships/star-citizen-sea-island-spaceship-wallpaper.jpg";
import img5 from "../../../assets/img/ships/emmanuel-shiu-vtol-008-2k.jpg";
import { Button } from "../Button/Button";
import axios from "../../../api/axios";

export const Carousel = () => {
  // const images = [img1, img2, img3, img4, img5];

  const [current, setCurrent] = useState(0);

  const [showCaseList, setShowCase] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getNewShips = async () => {
      try {
        const response = await axios.get("/showcased-products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setShowCase(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getNewShips();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);  

  const nextSlide = () => {
    setCurrent(current === showCaseList.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? showCaseList.length - 1 : current - 1);
  };

  if (!Array.isArray(showCaseList) || showCaseList.length <= 0) {
    return null;
  }

  const slideFactory = (product) => {
    const price = parseFloat(product.price).toFixed(2);
    const DiscountPrice = parseFloat(
      price - (price / 100) * product.discountOptions.discountAmount
    ).toFixed(2);
    console.log(product);
    return (
      
      <div
        className={classes.img}
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${product.image})`,
        }}
      >
        <div className={`${classes.slider_information} ${classes.row}`}>
          <div className={classes.product_card}>
            <h3 className={classes.card_title}>{product.title}</h3>
            <p>{product.desc}</p>

            <div className={classes.price}>
              {product.discountOptions.discount ? (
                <>
                  <div className={classes.main_price}>
                    <ion-icon name="logo-electron"></ion-icon>
                    <h3>{DiscountPrice.split(".")[0]}</h3>
                  </div>
                  <p>.{DiscountPrice.split(".")[1]} GSC</p>
                  <div className={classes.discount}>
                    <span></span>
                    <div className={classes.price_discount}>
                      <ion-icon name="logo-electron"></ion-icon>
                      <h3>{price.split(".")[0]}</h3>
                      <p>.{price.split(".")[1]} GCY</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.main_price}>
                    <ion-icon name="logo-electron"></ion-icon>
                    <h3>{price.split(".")[0]}</h3>
                  </div>
                  <p>.{price.split(".")[1]} GSC</p>
                </>
              )}
            </div>
            <div className={classes.save_div}>
              {product.discountOptions.discount && (
                <h5>Save {product.discountOptions.discountAmount}%</h5>
              )}
            </div>
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
      {showCaseList.map((product, index) => {
        return (
          <div
            key={index}
            className={
              index === current
                ? `${classes.slide} ${classes.active}`
                : `${classes.slide}`
            }
          >
            {index === current && slideFactory(product)}
          </div>
        );
      })}
    </div>
  );
};
