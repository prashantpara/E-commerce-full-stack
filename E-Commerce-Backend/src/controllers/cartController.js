const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    let cartData = req.body;
    if (Object.keys(cartData).length === 0) {
      return res.status(500).json({ msg: "No Data Found" });
    }
    let { userId, productId, quantity } = cartData;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid userId ." });
    }
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ msg: "Invalid productId ." });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ msg: "quantity must be atleast 1." });
    }

    const product = await productModel.findById({_id:productId, 
      isDeleted: false,
    });
    if (!product) {
      return res.status(404).json({ msg: "product Not Found" });
    }

    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found." });
    }

    let cart = await cartModel.findOne({userId});
    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [
          {
            productId,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
        totalItems: 1,
      });
    } else {
      const productExists = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (productExists) {
        productExists.quantity += 1;
      } else {
        cart.items.push({ productId, quantity });
        cart.totalItems += cart.items.push({ productId, quantity });
      }
      cart.totalPrice += product.price * quantity;
      await cart.save();
    }
    return res
      .status(201)
      .json({ msg: "product added to cart succesfully.", cart });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Internal server error in createCart !!", error });
  }
};

// get AllCart
const getCarts = async (req, res) => {
  try {
    let carts = await cartModel.find();
    if (carts.length === 0) {
      return res.status(404).json({ msg: "carts Not Found" });
    }
    return res.status(201).json({ msg: "carts get successfull", carts });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error in get!!", error });
  }
};

// delete cart
const deletecart = async (req, res) => {
  try {
    let cartId = req.params.cartId;
    console.log(cartId);
    if (!mongoose.isValidObjectId(cartId)) {
      return res.status(400).json({ msg: "Invalid cartId ." });
    }
    let deletedCart = await cartModel.findByIdAndDelete({ _id: cartId });
    if (!deletedCart) {
      return res.status(404).json({ msg: "Cart Not Found ." });
    }
    return res
      .status(200)
      .json({ msg: "Cart  Deleted Successfully.", deletedCart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error deleteProduct" });
  }
};

module.exports = { addToCart, getCarts, deletecart };
