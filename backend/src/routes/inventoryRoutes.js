const express = require("express");
const { listInventory } = require("../controllers/inventoryController");

const router = express.Router();

router.get("/show-inventory", listInventory);
// router.post("/order-inventory", orderInventory);


module.exports = router;