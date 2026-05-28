const express = require("express");
const { listMembers } = require("../controllers/memberController");

const router = express.Router();

router.get("/listMembers", listMembers);

module.exports = router;