const express = require("express");
const { listBoys, getMemberRanking, getMemberInfo, updateMemberInfo, listOfficers} = require("../controllers/memberController");

const router = express.Router();

router.get("/listBoys", listBoys);
router.post("/get-rank", getMemberRanking);
router.post("/get-info", getMemberInfo);
router.put("/:id", updateMemberInfo);
router.get("/listOfficers", listOfficers);
module.exports = router;