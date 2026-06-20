const express = require("express");
const { showMemberBySquad, submitAttendance, checkAttendance} = require("../controllers/attendanceController");


const router = express.Router();

router.get("/show-member-squad", showMemberBySquad);
router.post("/submit", submitAttendance);
router.post("/check", checkAttendance);

module.exports = router;