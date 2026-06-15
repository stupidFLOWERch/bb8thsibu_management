const { getAllMembers } = require("../models/attendanceModel");

async function showMemberBySquad(req, res) {
    try {
        const members = await getAllMembers(); 

        const grouped = members.reduce((acc, row) => {
            const key = row.Squad_id;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push({
                id: row.Id,
                firstName: row.First_name,
                lastName: row.Last_name,
                email: row.Email
            });

            return acc;
        }, {});

        return res.json(grouped); // return grouped data

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { showMemberBySquad };