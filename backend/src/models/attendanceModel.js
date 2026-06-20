const { sql } = require("../db");

async function getBoysMembers() {
    const request = new sql.Request();

    const result = await request
        .query(`
            SELECT 
                m.First_name,
                m.Last_name,
                m.Id,
                m.Squad_id,
                r.Role
            FROM Members m
            JOIN Rankings r
                on m.Ranking_id = r.Id
            WHERE r.Role = 'Boys'
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

async function getAttendanceByDate(date) {
    const request = new sql.Request();

    const result =await request
        .input("date", sql.Date, date)
        .query(`
            SELECT 
                m.First_name,
                m.Last_name,
                m.Id,
                m.Squad_id,
                a.Attendance_date,
                a.Status
            FROM Members m
            JOIN Attendance a
                on m.Id = a.Member_id
            WHERE a.Attendance_date = @date
        `);
    return result.recordset;
}

module.exports = { getBoysMembers, takeAttendance, getAttendanceByDate };