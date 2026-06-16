const express = require("express");
const { showMemberBySquad, submitAttendance} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/show-member-squad", showMemberBySquad);
router.post("/submit", submitAttendance);

module.exports = router;