import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { SubHeader } from "../../SubHeader/SubHeader";
import { ShipCard } from "../../UI/ShipCard/ShipCard";

import classes from "./AllProducts.module.scss";

export const AllProducts = () => {
  const [shipList, setShipList] = useState([]);
  console.log(shipList);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/all-products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setShipList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllProducts();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className={` ${classes.main} ${classes.row}`}>
      <h1>All Ships</h1>
      <div className={classes.ship_container}>
        {shipList.map((ship) => {
          return <ShipCard shipDetails={ship} />;
        })}
      </div>
    </div>
  );
};
