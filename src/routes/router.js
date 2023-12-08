const express = require("express");
const router = express.Router();
const authRouter = require("./router.auth");
const productRouter = require("./product.router");
const basketRouter = require("./basket.router");
const {logout} = require("../controllers/auth.controller");
const {validateToken} = require("../middleware/auth.middleware");

router.use("/", authRouter);
router.use("/products", productRouter);

// secured
router.use([validateToken]);
router.post("/logout", logout);
router.use("/baskets", basketRouter);

module.exports = router;
