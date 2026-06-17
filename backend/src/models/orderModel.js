const { sql } = require("../db");

async function createOrder(userId) {
    const request = new sql.Request();
  
    const result = await request
      .input("userId", sql.Int, userId)
      .query(`
        INSERT INTO OrderHistory (User_id, Status)
        OUTPUT INSERTED.Order_id
        VALUES (@userId, 'Pending')
      `);
  
    return result.recordset[0].Order_id;
  }

  async function createOrderItem(orderId, itemId, qty) {
    const request = new sql.Request();
  
    await request
      .input("orderId", sql.Int, orderId)
      .input("itemId", sql.Int, itemId)
      .input("qty", sql.Int, qty)
      .query(`
        INSERT INTO OrderDetails (Order_id, Item_id, Quantity)
        VALUES (@orderId, @itemId, @qty)
      `);
  }

  async function getOrderHistory() {
    const request = new sql.Request();
  
    const result = await request
      .query(`
        SELECT 
          oh.Order_id,
          oh.Status,
          oh.CreatedAt,
          u.First_name
        FROM OrderHistory oh
        Join Users u
          ON oh.User_id = u.Id
      `);
      
      return result.recordset;
    }

  async function getOrderDetails(orderId) {
    const request = new sql.Request();

    const result = await request
    .input("orderId", sql.Int, orderId)
      .query(`
        SELECT 
          od.OrderDetail_id,
          od.Order_id,
          od.Quantity,
          i.Items
        FROM OrderDetails od
        JOIN Inventories i 
          ON od.Item_id = i.Id
        WHERE od.Order_id = @orderId
      `);
        
      return result.recordset;
    }
    
module.exports = { createOrder, createOrderItem, getOrderHistory, getOrderDetails };
