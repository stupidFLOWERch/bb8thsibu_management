const { sql } = require("../db");

async function getAllMembers() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Members
        `);

    return result.recordset;
}

async function takeAttendance(memberId) {
    try {
        const request = new sql.Request();

        const result = await request
            .input("memberId", sql.Int, memberId)
            .query(`
                INSERT INTO Attendance (MemberId, Status, Date)
                VALUES (@memberId, 'Present', GETDATE())
            `);

        return result.rowsAffected;

    } catch (err) {
        throw err;
    }
}


module.exports = { getAllMembers, takeAttendance };