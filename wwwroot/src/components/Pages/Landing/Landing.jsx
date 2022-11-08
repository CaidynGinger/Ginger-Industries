import React from "react";
import { ShipCard } from "../../UICard/ShipCard";
import { SubHeader } from "../../SubHeader/SubHeader";
import { Carousel } from "../../UI/Carousel/Carousel";

import classes from "./Landing.module.scss";

export const Landing = () => {
  const ships = [
    {
      id: 1,
      title: "Ship 1",
      desc: "dpubaodwawdwada",
      price: 50,
      discountOptions: {
        discount: true,
        discountAmount: 10
      },
      stock: 0
    },
    {
      id: 11,
      title: "Ship 2",
      desc: "dpubaodwawdwada",
      price: 100.50,
      discountOptions: {
        discount: true,
        discountAmount: 20
      },
      stock: 3
    },
    {
      id: 13,
      title: "Ship 3",
      desc: "dpubaodwawdwada",
      price: 90,
      discountOptions: {
        discount: false,
        discountAmount: 20
      },
      stock: 10
    },
    {
      id: 4,
      title: "Ship 4",
      desc: "dpubaodwawdwada",
      price: 199.99,
      discountOptions: {
        discount: false,
        discountAmount: 20
      },
      stock: 1
    },
  ];
  const Newships = [
    {
      id: 1,
      title: "Ship 1",
      desc: "dpubaodwawdwada",
      price: 50,
      discountOptions: {
        discount: true,
        discountAmount: 10
      },
      stock: 0
    },
    {
      id: 11,
      title: "Ship 2",
      desc: "dpubaodwawdwada",
      price: 100.50,
      discountOptions: {
        discount: true,
        discountAmount: 20
      },
      stock: 3
    },
    {
      id: 13,
      title: "Ship 3",
      desc: "dpubaodwawdwada",
      price: 90,
      discountOptions: {
        discount: false,
        discountAmount: 20
      },
      stock: 10
    },
    {
      id: 4,
      title: "Ship 4",
      desc: "dpubaodwawdwada",
      price: 199.99,
      discountOptions: {
        discount: false,
        discountAmount: 20
      },
      stock: 1
    },
  ];
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
          {ships.map(ship => {
            return <ShipCard shipDetails={ship}/>
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
          {Newships.map(ship => {
            return <ShipCard shipDetails={ship}/>
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
