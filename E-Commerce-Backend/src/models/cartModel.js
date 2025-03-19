const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    items: [
      {
        productId: {
          type: ObjectId,
          ref:"product",
          required: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        _id: false,
      },
    ],

    totalItems: {
      type: Number,
      default: 0,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
  },
  { timestamps: true }
);

const cartModel = new mongoose.model("cart", cartSchema);

module.exports = cartModel;
