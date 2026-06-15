const express = require("express");
const { showMemberBySquad } = require("../controllers/attendanceController");

const router = express.Router();

router.get("/show-member-squad", showMemberBySquad);


module.exports = router;