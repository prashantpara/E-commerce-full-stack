const productModel = require("../models/productModel");
const mongoose = require("mongoose");
const { isValid } = require("./validator");

// create product
const addProduct = async (req, res) => {
  try {
    let productbody = req.body;
    if (Object.keys(productbody).length === 0) {
      return res.status(400).json({ msg: "No Data Found, Bad Request" });
    }
    let {
      image,
      title,
      price,
      description,
      stock,
      rating,
      isFreeshipping,
      isDeleted,
      deletedAt,
    } = productbody;

    // Product Image Validation
    if (!isValid(image)) {
      return res.status(400).json({ msg: "Product Image is Required" });
    }

    // Product Title Validation
    if (!isValid(title)) {
      return res.status(400).json({ msg: "Product Title is Required" });
    }

    const checkDuplicateProductTitle = await productModel.findOne({ title });
    if (checkDuplicateProductTitle) {
      return res.status(400).json({ msg: "Product Already Exists" });
    }

    // Product Description Validation
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Product Description is Required" });
    }

    // Product Price Validation
    if (!isValid(price)) {
      return res.status(400).json({ msg: "Product Price is Required" });
    }
    if (typeof price !== "number") {
      return res.status(400).json({ msg: "Invalid Product Price " });
    }

    // Product Stock Validation
    if (!isValid(stock) || typeof stock !== "number" || stock < 0) {
      return res.status(400).json({ msg: "Valid Stock Quantity is Required" });
    }

    // Product Rating Validation
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
      return res.status(400).json({ msg: "InValid Product Rating." });
    }

    // Free Shipping Validation
    if (
      typeof isFreeshipping !== "undefined" &&
      typeof isFreeshipping !== "boolean"
    ) {
      return res
        .status(400)
        .json({ msg: "isFreeShipping must be a boolean value" });
    }

    // is Deleted Validation
    if (typeof isDeleted !== "undefined" && typeof isDeleted !== "boolean") {
      return res.status(400).json({ msg: "isDeleted must be a boolean value" });
    }

    // deleted At
    if (isDeleted && deletedAt && isNaN(Date.parse(deletedAt))) {
      return res.status(400).json({ msg: "deleted At must be a date format" });
    }

    let newProducts = {
      image,
      title,
      description,
      price,
      stock,
      rating,
      isFreeShipping: isFreeshipping || false,
      isDeleted: isDeleted || false,
      deletedAt: isDeleted ? new Date() : null,
    };

    const addedproduct = await productModel.create(newProducts);
    return res
      .status(201)
      .json({ msg: "product saved succesfully.", addedproduct });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error in createProduct !!", error });
  }
};

// getProduct
const getProduct = async (req, res) => {
  try {
    let products = await productModel.find(
      { isDeleted: false },
      { _id: 0, __v: 0, isDeleted: 0, deletedAt: 0, createdAt: 0, updatedAt: 0 }
    );
    if (products.length === 0) {
      return res.status(404).json({ msg: "product Not Found" });
    }
    return res
      .status(201)
      .json({ msg: "product data get successfull", products });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error in get!!", error });
  }
};

// getProductById
const getProductById = async (req, res) => {
  try {
    let productId = req.params.p_Id;
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ msg: "Invalid productId in getProductById." });
    }

    let product = await productModel.findById(productId, {
      __v: 0,
      isDeleted: 0,
      deletedAt: 0,
      createdAt: 0,
    });

    if (!product) {
      return res.status(404).json({ msg: "No Product Found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

// update
const updateProduct = async (req, res) => {
  try {
    let productData = req.body;
    if (Object.keys(productData).length === 0) {
      return res.status(400).json({ msg: "Enter Data To Update." });
    }

    let productId = req.params.p_Id;
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ msg: "Invalid productId in getProductById." });
    }

    let { image, title, price, description, stock, rating, isFreeshipping } =
      productData;

    // Product Image Validation
    if (image) {
      if (image && !isValid(image)) {
        return res.status(400).json({ msg: "Product Image is Required" });
      }
    }

    // Product Title Validation
    if (title) {
      if (!isValid(title)) {
        return res.status(400).json({ msg: "Product Title is Required" });
      }

      const checkDuplicateProductTitle = await productModel.findOne({ title });
      if (checkDuplicateProductTitle) {
        return res.status(400).json({ msg: "Product Already Exists" });
      }
    }

    // Product Description Validation
    if (description) {
      if (!isValid(description)) {
        return res.status(400).json({ msg: "Product Description is Required" });
      }
    }
    if (price) {
      // Product Price Validation
      if (!isValid(price)) {
        return res.status(400).json({ msg: "Product Price is Required" });
      }
    }

    // Product Stock Validation
    if (stock) {
      if (!isValid(stock) || typeof stock !== "number" || stock < 0) {
        return res
          .status(400)
          .json({ msg: "Valid Stock Quantity is Required" });
      }
    }

    // Product Rating Validation
    if (rating) {
      if (
        !isValid(rating) ||
        typeof rating !== "number" ||
        rating < 0 ||
        rating > 5
      ) {
        return res
          .status(400)
          .json({ msg: "Valid Product Rating is Required" });
      }
    }

    // Free Shipping Validation
    if (isFreeshipping) {
      if (
        typeof isFreeshipping !== "undefined" &&
        typeof isFreeshipping !== "boolean"
      ) {
        return res
          .status(400)
          .json({ msg: "isFreeShipping must be a boolean value" });
      }
    }

    let newProducts = {
      image,
      title,
      description,
      price,
      stock,
      rating,
      isFreeShipping: isFreeshipping || false,
    };

    const updatedproduct = await productModel.findByIdAndUpdate(
      productId,
      newProducts,
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Product Data Updated.", updatedproduct });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Internal Server error updateProduct" });
  }
};

// delete
const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.p_Id;
    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ msg: "Invalid productId in deleteProduct." });
    }
    let deletedProduct = await productModel.findByIdAndDelete(productId, {
      isDeleted: false,
    });
    if (!deletedProduct) {
      return res.status(404).json({ msg: "product Not Found ." });
    }
    return res.status(200).json({
      msg: "product Data Deleted Successfully.",
      deletedProduct: deletedProduct.title,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error deleteProduct" });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
