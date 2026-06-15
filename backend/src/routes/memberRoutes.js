const express = require("express");
const { listMembers, getMemberRanking } = require("../controllers/memberController");

const router = express.Router();

router.get("/listMembers", listMembers);
router.post("/get-rank", getMemberRanking);

module.exports = router;