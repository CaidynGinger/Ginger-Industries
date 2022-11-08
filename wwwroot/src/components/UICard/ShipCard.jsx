import React from "react";
import { Button } from "../UI/Button/Button";
import classes from "./ShipCard.module.scss";

export const ShipCard = (props) => {
  console.log(props.shipDetails);

  const shipDetails = props.shipDetails;

  const price = JSON.stringify(shipDetails.price).split(".")[0];
  const priceDecimal = JSON.stringify(shipDetails.price).split(".")[1];
  const discountPrice = Math.round((shipDetails.price * ((100 - shipDetails.discountOptions.discountAmount) / 100)) * 100) / 100;
  
  const discountPriceDisplay = JSON.stringify(discountPrice).split(".")[0] ;
  // const discountPriceDisplay = JSON.stringify(discountPrice.price).split(".")[0];
  let discountPriceDecimalDisplay = "00"
  if (JSON.stringify(discountPrice).split(".")[1]) {
    const discountPriceDecimalDisplay = JSON.stringify(discountPrice).split(".")[1]
  }
  // console.log(discountPriceDecimalDisplay);
  // const discountPriceDecimal = JSON.stringify(shipDetails.price).split(".")[1];

  // console.log();
  console.log(shipDetails.price);
  console.log(discountPrice);
  return (
    <div className={classes.ship_card}>
      <img
        src={
          "https://media.robertsspaceindustries.com/5lvt2b008irtk/store_small.jpg"
        }
      />
      <div className={classes.ship_card_text}>
        <h5>{shipDetails.title}</h5>
        <div className={classes.price}>
          {shipDetails.discountOptions.discount ? (
            <>
              <div className={classes.main_price}>
                <ion-icon name="logo-electron"></ion-icon>
                <h3>{discountPriceDisplay}</h3>
              </div>
              <p>.{discountPriceDecimalDisplay} GSC</p>
              <div className={classes.discount}>
                <span></span>
                <div className={classes.price_discount}>
                  <ion-icon name="logo-electron"></ion-icon>
                  <h3>{price}</h3>
                  <p>.50 GCY</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={classes.main_price}>
                <ion-icon name="logo-electron"></ion-icon>
                <h3>{price}</h3>
              </div>
              <p>.{priceDecimal} GSC</p>
            </>
          )}
        </div>
        {shipDetails.stock > 0 ? <h6 >In stock</h6> : <h6 className={classes.no_stock}>No Stock</h6>}
        
        <div className={classes.buttons}>
          <a className={classes.a}>MORE INFO</a>
          <Button>Add To Cart</Button>
        </div>
      </div>
      <div className={classes.border_div}></div>
    </div>
  );
};
