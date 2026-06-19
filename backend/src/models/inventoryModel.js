const { sql } = require("../db");

async function getAllInventory() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Inventories
        `);

    return result.recordset;
}

async function decreaseInventoryByName(orderItems) {

    for (const item of orderItems) {

        const request = new sql.Request(); // ✔️ MUST move inside loop

        const result = await request
            .input("items", sql.NVarChar, item.items)
            .input("qty", sql.Int, item.qty)
            .query(`
                UPDATE Inventories
                SET Numbers = Numbers - @qty
                WHERE Items = @items
                  AND Numbers >= @qty
            `);

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Not enough stock for ${item.items}`);
        }
    }
}


module.exports = { getAllInventory, decreaseInventoryByName };