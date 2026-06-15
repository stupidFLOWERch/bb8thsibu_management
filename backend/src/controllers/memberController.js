const { getAllMembers, getRankingIdByEmail, getRankingByRankingId } = require("../models/memberModel");

async function listMembers(_req, res) {
    try {
        const members = await getAllMembers();
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getMemberRanking(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email required" });
        }

        const rankingId = await getRankingIdByEmail(email);

        if (!rankingId) {
            return res.status(404).json({ error: "Member not found" });
        }

        const rank = await getRankingByRankingId(rankingId);

        if (!rank) {
            return res.status(404).json({ error: "Rank not found" });
        }
        // console.log("email:", email);
        // console.log("rank:", rank);
        return res.json({
            rank: rank.Ranks,
            role: rank.Role
        });

    } catch (err) {
        console.error("getMemberRanking error:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { listMembers, getMemberRanking };
