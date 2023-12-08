const express = require("express");
const {
  addBasket,
  getBaskeByUser,
  deleteBasketByUser,
} = require("../controllers/basket.controller");
const router = express.Router();

router.post("/", addBasket);
router.get("/", getBaskeByUser);
router.delete("/:id", deleteBasketByUser);

module.exports = router;
