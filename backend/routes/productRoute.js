const express = require("express");
const { getAllProducts,createProduct, updateProduct } = require("../controllers/productContoller");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router.route("/product/:id").put(updateProduct);

module.exports = router