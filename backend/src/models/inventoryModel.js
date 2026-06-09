const { sql } = require("../db");

async function getAllInventory() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Inventories
        `);

    return result.recordset;
}

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

// async function decreaseStock(orderItem.itemId, orderItem.qty) {
//     const request = new sql.Request();

//     await request
//         .input("userId", sql.NVarChar, userId)
//         .input("items", sql.NVarChar, items)
//         .input("number", sql.NVarChar, number)
//         .query(`
//             INSERT INTO OrderHistory (User_id, Items, Quantity)
//             VALUES (@userId, @items, @number)
//         `);
// }

module.exports = { getAllInventory, createOrder, createOrderItem };