const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountOptions: {
    discount: {
      type: Boolean,
      required: true,
      default: false
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  showCase: {
    type:Boolean,
    default: false
  },
  stock: {
    type: String,
    required: true,
    default: 0,
  },
  productAdded: {
    type: Date,
    default: Date.now,
  },
  image: String,
});

module.exports = mongoose.model("products", productSchema);
