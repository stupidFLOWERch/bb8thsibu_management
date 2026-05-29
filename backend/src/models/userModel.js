const { sql } = require("../db");

async function findUserByEmail(email) {
    const request = new sql.Request();

    const result = await request
        .input("email", sql.NVarChar, email)
        .query(`
            SELECT * FROM Users
            WHERE Email = @email
        `);

    return result.recordset[0];
}

async function getPasswordByEmail(email) {
    const request = new sql.Request();

    const result = await request
        .input("email", sql.NVarChar, email)
        .query(`
            SELECT Passwords FROM Users
            WHERE Email = @email
        `);

    return result.recordset[0];
}

async function createUser(firstName, lastName, email, password) {
    const request = new sql.Request();

    await request
        .input("firstName", sql.NVarChar, firstName)
        .input("lastName", sql.NVarChar, lastName)
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, password)
        .query(`
            INSERT INTO Users (First_name, Last_name, Email, Passwords)
            VALUES (@firstName, @lastName, @email, @password)
        `);
}

module.exports = { findUserByEmail, getPasswordByEmail, createUser };