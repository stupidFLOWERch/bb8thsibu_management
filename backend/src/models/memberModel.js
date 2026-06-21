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

async function getBoysList() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT 
                m.Id,
                m.First_name,
                m.Last_name
            FROM Members m
            JOIN Rankings r
                on m.Ranking_id = r.Id
            WHERE r.Role = 'Boys'
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

async function getMemberById(id) {
    const request = new sql.Request();

    const result = await request
        .input("id", sql.Int, id)
        .query(`
            SELECT 
                m.Id,
                m.First_name,
                m.Last_name,
                m.Telephone,
                m.Email,
                m.Squad_id,
                r.Ranks
            FROM Members m
            JOIN Rankings r
                on m.Ranking_id = r.Id
            WHERE m.id = @id
        `);

    return result.recordset[0];
}

async function updateMemberById(id, First_name, Last_name, Telephone, Ranks, Email, Squad_id) {
    const request = new sql.Request();

    await request
        .input("id", sql.Int, id)
        .input("first_name", sql.NVarChar, First_name)
        .input("last_name", sql.NVarChar, Last_name)
        .input("email", sql.NVarChar, Email)
        .input("telephone", sql.NVarChar, Telephone)
        .input("squad_id", sql.Int, Squad_id)
        .input("ranks", sql.NVarChar, Ranks)
        .query(`
            UPDATE Members
            SET 
                First_name = @first_name,
                Last_name = @last_name,
                Email = @email,
                Telephone = @telephone,
                Squad_id = @squad_id,
                Ranking_id = (SELECT Id FROM Rankings WHERE Ranks = @ranks)
            WHERE Id = @id
        `);
}

module.exports = { findMember, getBoysList, getRankingIdByEmail, getRankingByRankingId, getMemberById, updateMemberById };
