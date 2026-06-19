const { getAllInventory, decreaseInventoryByName } = require("../models/inventoryModel");
const { getOrderDetails } = require("../models/orderModel");

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

async function checkInventory(req, res) {
  try {
      const { orderId } = req.body;

      const items = await getOrderDetails(orderId);

      for (const item of items) {
          if (item.Numbers < item.Quantity) {
              return res.json({
                  valid: false,
                  message: `${item.Items} insufficient stock`
              });
          }
      }

      return res.json({
          valid: true
      });

  } catch (err) {
      res.status(500).json({
          valid: false,
          message: err.message
      });
  }
}

async function decreaseInventory(req, res) {
  const { orderItems } = req.body;

  try {
    await decreaseInventoryByName(orderItems);

    return res.json({
      success: true,
      message: "Inventory updated"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
  module.exports = { listInventory, checkInventory, decreaseInventory};