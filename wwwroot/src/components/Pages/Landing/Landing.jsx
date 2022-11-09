import React, { useEffect, useState } from "react";
import { ShipCard } from "../../UI/ShipCard/ShipCard";
import { SubHeader } from "../../SubHeader/SubHeader";
import { Carousel } from "../../UI/Carousel/Carousel";

import classes from "./Landing.module.scss";
import axios from "../../../api/axios";

export const Landing = () => {
  const [newShipsList, setNewShipsList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getNewShips = async () => {
      try {
        const response = await axios.get("/new-products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setNewShipsList(response.data);
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

  const [discountedShipsList, setDiscountedShipsList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getNewShips = async () => {
      try {
        const response = await axios.get("/discounted-products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setDiscountedShipsList(response.data);
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



  return (
    <div className={classes.row}>
      <p className={classes.disclaimer}>
        Please note new ships are should not be assumed to be off the factory
        floor <br /> Rather they are new to the store
      </p>
      <div className={classes.card}>
        <span className={classes.top_decor}></span>
        <div className={classes.div}>
          <header>
            <h2>Newest Ships</h2>
            <a>
              <span className={classes.arrows}>❭❭❭</span> See All Ships
            </a>
          </header>
          <div className={classes.ship_container}>
          {newShipsList.map((ship) => {
            return <ShipCard key={ship._id} shipDetails={ship}/>
          })}
          </div>
          
        </div>
      </div>
      <br />
      <br />
      <br />
      <p className={classes.disclaimer}>
        Discounted ships to get you in space faster than you can make money{" "}
        <br /> please note: discounts may end before payment is processed
      </p>
      <div className={classes.card}>
        <span className={classes.top_decor}></span>
        <div className={classes.div}>
          <header>
            <h2>Discounted Ships</h2>
            <a>
              <span className={classes.arrows}>❭❭❭</span> See All Ships
            </a>
          </header>
          <div className={classes.ship_container}>
          {discountedShipsList.map(ship => {
            return <ShipCard key={ship._id} shipDetails={ship}/>
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
