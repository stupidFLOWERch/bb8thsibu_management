const express = require("express");
const { listInventory, checkInventory, decreaseInventory } = require("../controllers/inventoryController");

const router = express.Router();

router.get("/show-inventory", listInventory);

router.post("/check", checkInventory);

router.post("/decrease", decreaseInventory);

module.exports = router;