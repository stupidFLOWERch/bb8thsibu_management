const { getAllMembers } = require("../models/memberModel");

async function listMembers(_req, res) {
    try {
        const members = await getAllMembers();
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { listMembers };
