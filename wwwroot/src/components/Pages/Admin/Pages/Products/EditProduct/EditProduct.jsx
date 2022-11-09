import React, { useEffect, useState } from "react";
import axios from "../../../../../../api/axios";
import { Button } from "../../../../../UI/Button/Button";
import { Checkbox } from "../../../../../UI/Checkbox/Checkbox";
import { Input } from "../../../../../UI/Input/Input";
import { Textarea } from "../../../../../UI/Textarea/Textarea";
import classes from "./EditProduct.module.scss";

export const EditProduct = (props) => {
  const SelectedProductDetails = props.SelectedProductDetails;
  console.log(SelectedProductDetails);

  const [ProductName, setProductName] = useState("");
  const [ReportBody, setReportBody] = useState("");
  const [ProductPrice, setProductPrice] = useState(null);
  const [IsDiscounted, setIsDiscounted] = useState(false);
  const [DiscountAmount, setDiscountAmount] = useState(0);
  const [ProductStock, setProductStock] = useState(null);
  const [ShowOnHomepage, setShowOnHomepage] = useState(null);

  useEffect(() => {
    if (SelectedProductDetails.title) {
      setProductName(SelectedProductDetails.title);
      setReportBody(SelectedProductDetails.desc);
      setProductPrice(SelectedProductDetails.price);
      setIsDiscounted(SelectedProductDetails.discountOptions.discount);
      setDiscountAmount(SelectedProductDetails.discountOptions.discountAmount);
      setProductStock(SelectedProductDetails.stock);
      setShowOnHomepage(SelectedProductDetails.showCase);
    }
  }, [props.SelectedProductDetails]);

  const CheckRoleHandler = (e) => {
    setIsDiscounted((prevState) => {
      return !prevState;
    });
  };

  const CheckShowOnHomepageHandler = (e) => {
    setShowOnHomepage((prevState) => {
      return !prevState;
    });
  };

  const UpdateProduct = (event) => {
    event.preventDefault();
    const patchProduct = async () => {
      try {
        const response = await axios.patch("/product", {
            id: SelectedProductDetails._id,
            title: ProductName,
            price: ProductPrice,
            desc: ReportBody,
            stock: ProductStock,
            showCase: ShowOnHomepage,
            discountAmount: DiscountAmount,
            discount: IsDiscounted,
          });
      } catch (err) {
        console.log(err);
      }
    };

    patchProduct();
    props.setSelectedProduct(null);
  };

  return (
    <section
      className={`${classes.modal} ${
        props.showNewProductModal ? classes.show : undefined
      }`}
    >
      <div
        className={classes.close_btn}
        onClick={() => {
            props.setSelectedProduct(null);
        }}
      >
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <form autoComplete="off" onSubmit={UpdateProduct}>
        <h1>Edit Product: {SelectedProductDetails.title}</h1>
        <Input
          label="Product Name"
          type="text"
          id="product-name"
          onChange={(event) => {
            setProductName(event.target.value);
          }}
          value={ProductName}
          required={true}
          valid={true}
        />
        <Textarea
          id="product-description"
          value={ReportBody}
          placeHolder={"Product description"}
          rows="6"
          onChange={(event) => {
            setReportBody(event.target.value);
          }}
        />
        <div className={classes.price_container}>
          <div className={classes.currency}>
            <ion-icon name="logo-electron"></ion-icon>
          </div>
          <Input
            label="Product price"
            type="number"
            id="product-price"
            onChange={(event) => {
              setProductPrice(event.target.value);
            }}
            value={ProductPrice}
            required={true}
            valid={true}
          />
        </div>
        <div className={classes.checkbox}>
          <Checkbox
            checked={IsDiscounted}
            onChange={CheckRoleHandler}
            name={"role.code"}
            title={"Set Discount"}
          />
        </div>

        {IsDiscounted && (
          <div className={classes.price_container}>
            <div className={classes.currency}>
              <p>%</p>
            </div>
            <Input
              label="Discount amount"
              type="number"
              id="product-discount-amount"
              onChange={(event) => {
                setDiscountAmount(event.target.value);
              }}
              value={DiscountAmount}
              required={true}
              valid={true}
            />
          </div>
        )}
        <Input
          label="Stock"
          type="number"
          id="product-stock"
          onChange={(event) => {
            setProductStock(event.target.value);
          }}
          value={ProductStock}
          required={true}
          valid={true}
        />
        <div className={classes.checkbox}>
          <Checkbox
            checked={ShowOnHomepage}
            onChange={CheckShowOnHomepageHandler}
            name={"set"}
            title={"Show on home page"}
          />
        </div>
        <br></br>
        <Button>Update Product</Button>
      </form>
    </section>
  );
};
