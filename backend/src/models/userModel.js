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

async function saveResetToken(userId, token, expires) {
    const request = new sql.Request();

    await request
        .input("userId", sql.NVarChar, userId)
        .input("token", sql.NVarChar, token)
        .input("expires", sql.NVarChar, expires)
        .query(`
            INSERT INTO PasswordResetTokens (UserId, Token, ExpiresAt)
            VALUES (@userId, @token, @expires)
        `);
}

async function findUserByResetToken(token) {
    const request = new sql.Request();

    const result = await request
        .input("token", sql.NVarChar, token)
        .query(`
            SELECT UserId, ExpiresAt
            FROM PasswordResetTokens
            WHERE Token = @token
        `);

    return result.recordset[0];
}

async function updateUserPassword(userId, password) {
    const request = new sql.Request();

    await request
        .input("userId", sql.Int, userId)
        .input("password", sql.NVarChar, password)
        .query(`
            UPDATE Users
            SET Passwords = @password
            WHERE Id = @userId
        `);
}

async function deleteTokenByToken(token) {
    const request = new sql.Request();

    await request
        .input("token", sql.NVarChar, token)
        .query(`
            DELETE FROM PasswordResetTokens
            WHERE Token = @token
        `);
}

module.exports = { findUserByEmail, getPasswordByEmail, createUser, saveResetToken, findUserByResetToken, updateUserPassword, deleteTokenByToken };