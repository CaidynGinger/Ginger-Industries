import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { Button } from "../../UI/Button/Button";
import { ShipCard } from "../../UI/ShipCard/ShipCard";
import classes from "./IndividualProductPage.module.scss";

export const IndividualProductPage = () => {
  const params = useParams();

  console.log(params.productId);

  const [ProductDetails, setProductDetails] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;
    const controller = new AbortController();
    const getProduct = async () => {
      try {
        const response = await axios.get("/product", {
          signal: controller.signal,
          params: { productId: params.productId },
        });
        console.log(response.data);
        isMounted && setProductDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [params.productId]);
  let price = "00.00"
  let DiscountPrice = '00.00'
  if (ProductDetails.title) {
    price = parseFloat(ProductDetails.price).toFixed(2);
    DiscountPrice = parseFloat(
      price - (price / 100) * ProductDetails.discountOptions.discountAmount
    ).toFixed(2);
  }

  const [ShipList, setShipList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getShips = async () => {
      try {
        const response = await axios.get("/4-products", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setShipList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getShips();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className={`${classes.row} ${classes.individual_product_page}`}>
      {ProductDetails.title ? (
        <div className={classes.card}>
          <span className={classes.top_decor}></span>
          <div className={classes.div}>
            <header>
              <h2>
                <span className={classes.arrows}>❭❭❭</span> Star Ship -{" "}
                {ProductDetails.title}
              </h2>
            </header>
            <div className={classes.ship_container}>
              <div className={classes.left_col}>
                <div className={classes.price_display}>
                  <div className={classes.price}>
                    {ProductDetails.discountOptions.discount ? (
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
                </div>
                {ProductDetails.discountOptions.discount && (
                  <p className={classes.save}>
                    Save {ProductDetails.discountOptions?.discountAmount}%
                  </p>
                )}
                <p className={classes.stock}>In Stock</p>
                <Button>Add to cart</Button>
              </div>
              <div className={classes.product_details_container}>
                <header>
                  <img src={ProductDetails.image} />
                  <div className={classes.title_banner}>
                    <h4>{ProductDetails.title}</h4>
                  </div>
                </header>
                <h3 className={classes.product_description_h3}>
                  Product description
                </h3>
                <p className={classes.product_description}>
                  {ProductDetails.desc}
                </p>
                
              </div>
              
            </div>
            <div className={classes.card}>
                  <span className={classes.top_decor}></span>
                  <div className={classes.div}>
                    <header>
                      <h2>Ships You Might Like</h2>
                      {/* <a>
                        <span className={classes.arrows}>❭❭❭</span> See All
                        Ships
                      </a> */}
                    </header>
                    <div className={classes.ship_container}>
                      {ShipList.map((ship) => {
                        return <ShipCard key={ship._id} shipDetails={ship} />;
                      })}
                    </div>
                  </div>
                </div>
          </div>
        </div>
      ) : (
        <h4>No product Found</h4>
      )}
    </div>
  );
};
