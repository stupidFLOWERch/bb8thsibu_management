const { getBoysMembers, takeAttendance, getAttendanceByDate } = require("../models/attendanceModel");

async function showMemberBySquad(req, res) {
    try {
        const members = await getBoysMembers(); 

        const grouped = members.reduce((acc, row) => {
          const key = row.Squad_id ?? "no_squad";
      
          if (!acc[key]) {
              acc[key] = [];
          }
      
          acc[key].push({
              id: row.Id,
              firstName: row.First_name,
              lastName: row.Last_name
          });
      
          return acc;
      }, {});

        return res.json(grouped); // return grouped data

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function submitAttendance(req, res) {
    try {
      const payload  = req.body;
  
      for (const item of payload) {
        await takeAttendance(item.memberId, item.status);
      }
  
      return res.json({
        success: true,
        message: "Attendance saved",
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }

  async function checkAttendance(req, res) {
    try {
      const {date}  = req.body;
      const members = await getAttendanceByDate(date);

      const grouped = members.reduce((acc, row) => {
        const key = row.Squad_id ?? "no_squad";
    
        if (!acc[key]) {
            acc[key] = [];
        }
    
        acc[key].push({
            id: row.Id,
            firstName: row.First_name,
            lastName: row.Last_name,
            status: row.Status,
            squad: row.Squad_id
        });
    
        return acc;
    }, {});

      return res.json(grouped); // return grouped data

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { showMemberBySquad, submitAttendance, checkAttendance};