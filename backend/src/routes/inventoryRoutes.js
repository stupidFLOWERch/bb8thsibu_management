const express = require("express");
const { listInventory, placeOrder } = require("../controllers/inventoryController");

const router = express.Router();

router.get("/show-inventory", listInventory);
router.post("/order-inventory", placeOrder);


module.exports = router;