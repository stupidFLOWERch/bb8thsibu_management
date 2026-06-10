const { getAllInventory, createOrder, createOrderItem } = require("../models/inventoryModel");

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

async function placeOrder(req, res) {
  const { userId, items} = req.body;
  const inventory = await getAllInventory();

  for (const orderItem of items) {
    const dbItem = inventory.find(i => i.Id === orderItem.itemId);

    if (!dbItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (orderItem.qty > dbItem.Numbers) {
      return res.status(400).json({
        error: `Not enough stock for ${dbItem.Items}`
      });
    }
  }

  const orderId = await createOrder(userId);

  for (const orderItem of items) {
    await createOrderItem(orderId, orderItem.itemId, orderItem.qty);

    //await decreaseStock(orderItem.itemId, orderItem.qty);
  }

  return res.json({ message: "Order placed successfully" });
}

  module.exports = { listInventory, placeOrder };