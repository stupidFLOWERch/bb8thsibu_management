const express = require("express");
const { placeOrder, listOrderHistory, showOrderDetails } = require("../controllers/orderController");

const router = express.Router();

router.post("/order-inventory", placeOrder);
router.get("/history", listOrderHistory);
router.get("/details/:orderId", showOrderDetails);

module.exports = router;