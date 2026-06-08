const express = require("express");
const { orderInventory } = require("../controllers/inventoryController");

const router = express.Router();

router.post("/order-inventory", orderInventory);
module.exports = router;