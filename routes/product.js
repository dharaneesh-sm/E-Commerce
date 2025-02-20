const express = require('express');
const router = express.Router();


const {addProduct, getAllProducts, getProductById, updateProduct, removeProduct} = require("../controllers/product.js")

router.route("/addProduct").post(addProduct);
router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById);
router.route("/products/:id").put(updateProduct);
router.route("/removeProduct/:id").delete(removeProduct);

module.exports = router;