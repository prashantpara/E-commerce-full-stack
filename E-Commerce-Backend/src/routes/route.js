const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
  signUpUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  addProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  addToCart,
  getCarts,
  deletecart,
} = require("../controllers/cartController");

// users
router.post("/signupUser", signUpUser);
router.post("/loginUser", loginUser);
router.get("/getUsers", authMiddleware, getUsers);
router.get("/getUserById/:userId", authMiddleware, getUserById);
router.put("/updateUser/:userId", authMiddleware, updateUser);
router.delete("/deleteUser/:userId", authMiddleware, deleteUser);

// product
router.post("/addProduct", authMiddleware, addProduct);
router.get("/getProduct", authMiddleware, getProduct);
router.get("/getProduct/:p_Id", authMiddleware, getProductById);
router.put("/updateProduct/:p_Id", authMiddleware, updateProduct);
router.delete("/deleteProduct/:p_Id", authMiddleware, deleteProduct);

// cart
router.post("/addToCart", addToCart);
router.get("/getCarts", getCarts);
router.delete("/deletecart/:cartId", deletecart);

module.exports = router;
