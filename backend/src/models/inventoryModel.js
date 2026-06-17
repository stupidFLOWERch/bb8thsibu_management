const { sql } = require("../db");

async function getAllInventory() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Inventories
        `);

    return result.recordset;
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

module.exports = { getAllInventory };