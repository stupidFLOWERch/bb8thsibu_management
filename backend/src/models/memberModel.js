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

async function getAllMembers() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Members
        `);

    return result.recordset;
}

async function getRankingIdByEmail(email) {
    const request = new sql.Request();

    const result = await request
        .input("email", sql.NVarChar, email)
        .query(`
            SELECT Ranking_id FROM Members
            WHERE Email = @email
        `);

    return result.recordset[0]?.Ranking_id;
}

async function getRankingByRankingId(id) {
    const request = new sql.Request();

    const result = await request
        .input("id", sql.Int, id)
        .query(`
            SELECT Ranks, Role FROM Rankings
            WHERE Id = @id
        `);

    return result.recordset[0];
}

module.exports = { findMember, getAllMembers, getRankingIdByEmail, getRankingByRankingId };
