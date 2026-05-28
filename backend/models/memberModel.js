const { sql } = require("../db");

async function getAllMembers() {
    const result = await sql.query("SELECT * FROM Members");
    return result.recordset;
}

module.exports = { getAllMembers };
