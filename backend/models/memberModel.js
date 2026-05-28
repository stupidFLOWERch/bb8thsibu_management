const { sql } = require("../db");


async function findMember(firstName, lastName, telephone) {
    const request = new sql.Request();

    const result = await request
        .input("firstName", sql.NVarChar, firstName)
        .input("lastName", sql.NVarChar, lastName)
        .input("telephone", sql.NVarChar, telephone)
        .query(`
            SELECT * FROM Members
            WHERE First_name = @firstName
              AND Last_name = @lastName
              AND Telephone = @telephone
        `);

    return result.recordset[0];
}

module.exports = { findMember };
