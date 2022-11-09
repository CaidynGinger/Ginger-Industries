import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../../../UI/Button/Button";
import { Checkbox } from "../../../../../UI/Checkbox/Checkbox";
import { Input } from "../../../../../UI/Input/Input";
import { Textarea } from "../../../../../UI/Textarea/Textarea";

import classes from "./AddProductModal.module.scss";

export const AddProductModal = (props) => {
  const [ProductName, setProductName] = useState("");
  const [ReportBody, setReportBody] = useState("");
  const [ProductPrice, setProductPrice] = useState(null);
  const [IsDiscounted, setIsDiscounted] = useState(false);
  const [DiscountAmount, setDiscountAmount] = useState(0);
  const [ProductStock, setProductStock] = useState(null);
  const [ShowOnHomepage, setShowOnHomepage] = useState(null);
  const [ProductImage, setProductImage] = useState();

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

  useEffect(() => {
    if (DiscountAmount > 100) {
      setDiscountAmount(100);
      return;
    }
    if (DiscountAmount < 0) {
      setDiscountAmount(0);
      return;
    }
  }, [DiscountAmount]);

  const createNewProduct = (event) => {
    event.preventDefault();

    const payloadData = new FormData();

    const payload = {
      title: ProductName,
      price: ProductPrice,
      desc: ReportBody,
      image: img.current.value.substr(12),
      stock: ProductStock,
      showCase: ShowOnHomepage,
      discountAmount: DiscountAmount,
      discount: IsDiscounted,
    };

    payloadData.append("information", JSON.stringify(payload));
    payloadData.append("image", ProductImage);

    // console.log(payloadData);
    console.log(payload);

    const postProduct = async () => {
      try {
        const response = await axios
          .post("http://localhost:3500/add-product", payloadData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("product added");
            // setModal(true);
          })
          .catch((err) => {
            console.log(err);
            // setModal(false);
          });
      } catch (err) {
        console.log(err);
      }
    };
    postProduct();
    setProductName("");
    setReportBody("");
    setProductPrice(null);
    setIsDiscounted(false);
    setDiscountAmount(null);
    setProductStock(null);
    setShowOnHomepage(null);
    setProductImage();
  };

  const img = useRef();

  const imageVal = (e) => {
    let file = e.target.files[0];
    setProductImage(file);
    let reader = new FileReader();

    reader.onloadend = function () {
      // console.log(reader.result);

      let image = new Image();
      image.src = reader.result;
      image.setAttribute("style", "width: auto; border-radius: 15px;");
      document.getElementById("screenshot").appendChild(image);
    };
    reader.readAsDataURL(file);
  };

  //   console.log(img.current.value);

  return (
    <section
      className={`${classes.modal} ${
        props.showNewProductModal ? classes.show : undefined
      }`}
    >
      <div className={classes.close_btn} onClick={props.closeModalHandler}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <form autoComplete="off" onSubmit={createNewProduct}>
        <h1>Add new Product</h1>
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
        <div className={classes.screenshot_uploader}>
          <label className={classes.upload} for="upload">
            <p> Upload Screenshot(s)</p>

            <input
              name="upload"
              className={classes.upload}
              type="file"
              // inputType="file"
              ref={img}
              onChange={imageVal}
            />
          </label>
          <div id="screenshot" className={classes.screenshot}></div>
        </div>

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
        <Button>Create New Product</Button>
      </form>
    </section>
  );
};
