const { getBoysList, getRankingIdByEmail, getRankingByRankingId, getMemberById, updateMemberById } = require("../models/memberModel");

async function listBoys(_req, res) {
    try {
        const members = await getBoysList();
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

async function getMemberInfo(req, res) {
    try {
        const { id } = req.body;
        const info = await getMemberById(id);
        res.json(info);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateMemberInfo(req, res) {
    try {
        const { id, First_name, Last_name, Telephone, Ranks, Email, Squad_id } = req.body;
        await updateMemberById(id, First_name, Last_name, Telephone, Ranks, Email, Squad_id);
        
        return res.json({
            success: true,
            message: "Updated successfully"
          });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = { listBoys, getMemberRanking, getMemberInfo, updateMemberInfo };
