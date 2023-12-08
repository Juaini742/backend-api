const express = require("express");
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  deleteProductById,
  updateProduct,
  deleteAllProduct,
} = require("../controllers/product.controller");
const {validateToken} = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateToken, addNewProduct);
router.delete("/:id", validateToken, deleteProductById);
router.delete("/", validateToken, deleteAllProduct);
router.put("/:id", validateToken, updateProduct);

module.exports = router;
