const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productContoller");
const { isAuth , authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get( getAllProducts);
router.route("/products/new").post(isAuth, authorizeRoles("admin") ,createProduct);
router.route("/product/:id").put(isAuth, authorizeRoles("admin") ,updateProduct).delete(isAuth, authorizeRoles("admin") ,deleteProduct).get(getProductDetails);

module.exports = router