const express = require("express");
const { getNotificationsController, createNotifications, markNotificationRead } = require("../controllers/notificationController");

const router = express.Router();

router.post("/get-notifications", getNotificationsController);
router.post("/create-notification", createNotifications);
router.post("/mark-notification-read", markNotificationRead);
module.exports = router;