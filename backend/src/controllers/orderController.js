const { createOrder, createOrderItem, getOrderHistory, getOrderDetails } = require("../models/orderModel");
const { getAllInventory} = require("../models/inventoryModel");


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

  async function listOrderHistory(req, res) {
    try {
      const data = await getOrderHistory();
      const formatted = data.map(order => ({
        id: order.Order_id,
        user: order.First_name,
        status: order.Status,
        time: order.CreatedAt,
      }));
  
      res.json(formatted);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to load order history" });
    }
  }

async function showOrderDetails(req, res) {
  const { orderId } = req.params;

  const data = await getOrderDetails(orderId);

  res.json(data);
}

// async function showOrderDetails(req, res) {
//   const data = await getOrderHistory();
  
//   const formatted = data.map(order=> ({
//     id: order.Order_id,
//     status: order.Status,
//     time: order.CreatedAt,
//   }));
  
//   res.json(formatted);
// }

  module.exports = { placeOrder, listOrderHistory, showOrderDetails };