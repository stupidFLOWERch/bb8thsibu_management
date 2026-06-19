const express = require("express");
const { placeOrder, listOrderHistory, showOrderDetails, completeOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/order-inventory", placeOrder);
router.get("/history", listOrderHistory);
router.get("/details/:orderId", showOrderDetails);
router.post("/completed", completeOrder)

module.exports = router;