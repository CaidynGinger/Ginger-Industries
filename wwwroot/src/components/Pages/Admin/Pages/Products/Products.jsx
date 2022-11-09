import React, { useEffect, useState } from "react";
import axios from "../../../../../api/axios";
import { AddProductModal } from "./AddProductModal/AddProductModal";

import classes from "./Products.module.scss";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/all-products", {
          signal: controller.signal,
        });
        // console.log(response.data);
        isMounted && setProductList(response.data);
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

  const removeProductHandler = (id) => {
    console.log("remove" + id);
  };

  const openProductHandler = (id) => {
    console.log("open" + id);
  };


  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const ToggleModalHandler= () => {
    setShowNewProductModal(prevState => {
        return !prevState
    })
  }
  return (
    <section className={classes.row}>
      
      {showNewProductModal && <div className={classes.gradient}></div>}
      <AddProductModal showNewProductModal={showNewProductModal} closeModalHandler={ToggleModalHandler}/>
      
      <header className={classes.product_header}>
        <h1>Products List</h1>
        <a onClick={ToggleModalHandler}>Add New Product</a>
      </header>

      <table className={classes.product_table}>
        <tr>
          <th className={classes.first}>Product name</th>
          <th>Price</th>
          <th># In Stock</th>
          <th>Is Discounted</th>
          <th>Discount Percentage</th>
          <th>Remove</th>
        </tr>
        {productList.map((product) => {
          console.log(product);

          return (
            <tr key={product._id}>
              <td
                onClick={() => {
                  openProductHandler(product._id);
                }}
                className={classes.first}
              >
                {product.title}
              </td>
              <td
                onClick={() => {
                  openProductHandler(product._id);
                }}
              >
                <ion-icon name="logo-electron"></ion-icon>
                {product.price}
              </td>
              <td
                onClick={() => {
                  openProductHandler(product._id);
                }}
              >
                {product.stock}
              </td>
              <td
                onClick={() => {
                  openProductHandler(product._id);
                }}
              >
                {product?.discountOptions?.discount ? "Yes" : "No"}
              </td>
              <td
                onClick={() => {
                  openProductHandler(product._id);
                }}
              >
                %{product?.discountOptions?.discountAmount}
              </td>
              <td>
                <a
                  onClick={() => {
                    removeProductHandler(product._id);
                  }}
                >
                  Remove
                </a>
              </td>
            </tr>
          );
        })}
      </table>
    </section>
  );
};
