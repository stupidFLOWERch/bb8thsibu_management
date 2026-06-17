const { getAllInventory } = require("../models/inventoryModel");

async function listInventory(req, res) {
  const data = await getAllInventory();

  const formatted = data.map(item => ({
    id: item.Id,
    name: item.Items,
    stock: item.Numbers,
    image: item.Images
  }));

  res.json(formatted);
}

  module.exports = { listInventory};