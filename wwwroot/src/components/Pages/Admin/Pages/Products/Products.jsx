import React, { useEffect, useState } from "react";
import axios from "../../../../../api/axios";
import { Button } from "../../../../UI/Button/Button";
import { AddProductModal } from "./AddProductModal/AddProductModal";
import { EditProduct } from "./EditProduct/EditProduct";

import classes from "./Products.module.scss";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState(null);
  const [SelectedProductDetails, setSelectedProductDetails] = useState({});
  const [GetNewData, setGetNewData] = useState(false)
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/all-products", {
          signal: controller.signal,
        });
        isMounted && console.log(response.data);
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
  }, [GetNewData]);

  const [DeleteProductModalShow, setDeleteProductModalShow] = useState(false);

  const [RemoveModalData, setRemoveModalData] = useState({
    id: "",
    title: "",
  });

  const removeProductModalHandler = (id, productName) => {
    setRemoveModalData({
      id: id,
      title: productName,
    });
    setDeleteProductModalShow(true);
  };

  const openProductHandler = (id) => {
    setSelectedProduct(id);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    
    if (SelectedProduct) {
      const getProduct = async () => {
        try {
          const response = await axios.get("/product", {
            params: { productId: SelectedProduct },
          });
          console.log(SelectedProduct);
          setSelectedProductDetails(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      getProduct();
    } else {
      setGetNewData(true)
    }
  }, [SelectedProduct]);

  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const ToggleModalHandler = () => {
    setShowNewProductModal((prevState) => {
      return !prevState;
    });
  };

  const removeProduct = async () => {
    setDeleteProductModalShow(false);
    try {
      const response = await axios.delete("/product", {
        params: { productId: RemoveModalData.id },
      });
    } catch (err) {
      console.log(err);
    }
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/all-products");
        setProductList(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
  };

  return (
    <section className={classes.row}>
      {showNewProductModal && (
        <div onClick={ToggleModalHandler} className={classes.gradient}></div>
      )}
      <AddProductModal
        showNewProductModal={showNewProductModal}
        closeModalHandler={ToggleModalHandler}
      />

      {DeleteProductModalShow && (
        <div
          onClick={() => {
            setDeleteProductModalShow(false);
          }}
          className={classes.gradient}
        ></div>
      )}
      <div
        className={`${classes.remove_modal} ${
          DeleteProductModalShow ? classes.show : undefined
        }`}
      >
        <div
          className={classes.close_btn}
          onClick={() => {
            setDeleteProductModalShow(false);
          }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <h3>
          Are you sure you want to remove this product <br /> "
          {RemoveModalData.title}" <br /> This can not be undone
        </h3>
        <div className={classes.form_buttons}>
          <Button onClick={removeProduct}>Yes</Button>
          <Button
            onClick={() => {
              setDeleteProductModalShow(false);
            }}
          >
            No
          </Button>
        </div>
      </div>

      {SelectedProductDetails.title && (
        <EditProduct
          SelectedProduct={SelectedProduct}
          setSelectedProduct={setSelectedProduct}
          SelectedProductDetails={SelectedProductDetails}
        />
      )}
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
        {productList && (
          productList.map((product) => {
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
                      removeProductModalHandler(product._id, product.title);
                    }}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            );
          })
        )}
        
      </table>
    </section>
  );
};
