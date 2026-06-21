const express = require("express");
const { listBoys, getMemberRanking, getMemberInfo, updateMemberInfo} = require("../controllers/memberController");

const router = express.Router();

router.get("/listBoys", listBoys);
router.post("/get-rank", getMemberRanking);
router.post("/get-info", getMemberInfo);
router.post("/update", updateMemberInfo);

module.exports = router;