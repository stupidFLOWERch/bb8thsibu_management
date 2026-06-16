const { sql } = require("../db");

async function getAllMembers() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT * FROM Members
        `);

    return result.recordset;
}

async function takeAttendance(memberId, status) {
    const request = new sql.Request();

    await request
        .input("memberId", sql.Int, memberId)
        .input("status", sql.VarChar, status)
        .query(`
            INSERT INTO Attendance (Member_id, Attendance_date, Status )
            VALUES (@memberId, GETDATE(), @status)
        `);
}


module.exports = { getAllMembers, takeAttendance };