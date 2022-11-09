import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";
import classes from "./ShipCard.module.scss";

export const ShipCard = (props) => {

  const shipDetails = props.shipDetails;

  const navigate = useNavigate()

  const price = parseFloat(shipDetails.price).toFixed(2);
  const DiscountPrice = parseFloat(
    price - (price / 100) * shipDetails.discountOptions.discountAmount
  ).toFixed(2);
  console.log(shipDetails);
  return (
    <div onClick={() => {navigate('/products/' + shipDetails._id)}} className={classes.ship_card}>
      <img
        src={
          shipDetails.image
        }
      />
      <div className={classes.ship_card_text}>
        <h5>{shipDetails.title}</h5>
        <div className={classes.price}>
          {shipDetails.discountOptions.discount ? (
            <>
              <div className={classes.main_price}>
                <ion-icon name="logo-electron"></ion-icon>
                <h3>{DiscountPrice.split('.')[0]}</h3>
              </div>
              <p>.{DiscountPrice.split('.')[1]} GSC</p>
              
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
        
        {shipDetails.discountOptions.discount && <p>Save {shipDetails.discountOptions.discountAmount}%</p>}
        </div>
        {shipDetails.stock > 0 ? (
          <h6>In stock</h6>
        ) : (
          <h6 className={classes.no_stock}>No Stock</h6>
        )}

        <div className={classes.buttons}>
          <Link to={'/products/' + shipDetails._id} className={classes.a}>MORE INFO</Link>
          <Button>Add To Cart</Button>
        </div>
      </div>
      <div className={classes.border_div}></div>
    </div>
  );
};
