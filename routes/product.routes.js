const express = require("express");
const productsRouter = express();
const productSchema = require("../models/product");
const multer = require("multer");
const path = require("path");

productsRouter.get("/all-products", async (req, res) => {
  const data = await productSchema.find();

  const response = data
    .map((product) => {
      return {
        ...product._doc,
        image: "http://localhost:3500/images/" + product.image,
      };
    })
    .sort(function (a, b) {
      return new Date(b.productAdded) - new Date(a.productAdded);
    });
  res.status(200).json(response);
});

productsRouter.get("/new-products", async (req, res) => {
  const data = await productSchema.find();
  const response = data
    .sort(function (a, b) {
      return new Date(b.productAdded) - new Date(a.productAdded);
    })
    .map((product) => {
      return {
        ...product._doc,
        image: "http://localhost:3500/images/" + product.image,
      };
    })
    .slice(0, 4);
  res.status(200).json(response);
});

productsRouter.get("/showcased-products", async (req, res) => {
  const data = await productSchema.find();
  const response = data
    .filter((product) => {
      return product.showCase;
    })
    .map((product) => {
      return {
        ...product._doc,
        image: "http://localhost:3500/images/" + product.image,
      };
    });
  res.status(200).json(response);
});

productsRouter.get("/discounted-products", async (req, res) => {
  const data = await productSchema.find();

  const response = data
    .filter((product) => {
      return product.discountOptions.discount === true;
    })
    .map((product) => {
      return {
        ...product._doc,
        image: "http://localhost:3500/images/" + product.image,
      };
    })
    .sort(function (a, b) {
      return new Date(b.productAdded) - new Date(a.productAdded);
    })
    .slice(0, 4);
  res.status(200).json(response);
});

const questionImageStore = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./images");
  },

  filename: (req, file, callback) => {
    // console.log(file);
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadProductImage = multer({ storage: questionImageStore });

productsRouter.post(
  "/add-product",
  uploadProductImage.single("image"),
  async (req, res) => {
    console.log("awg8dybu9iajonwdkl");
    const { title, price, discount, discountAmount, desc, stock, showCase } =
      JSON.parse(req.body.information);
    try {
      const newProduct = new productSchema({
        title: title,
        desc: desc,
        price: price,
        discountOptions: {
          discount: discount,
          discountAmount: discountAmount,
        },
        stock: stock,
        showCase: showCase,
        image: req.file.filename,
      });
      await newProduct.save();
      res.status(201).json({ success: `new product was added!` });
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

module.exports = productsRouter;
