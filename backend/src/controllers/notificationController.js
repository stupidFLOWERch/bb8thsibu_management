const { getNotifications, insertNotification, insertNotificationRead } = require("../models/notificationModel");

async function getNotificationsController(req, res) {
    const userId = Number(req.body?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: "A valid userId is required." });
    }

    try {
        const notifications = await getNotifications(userId);
        return res.json(notifications);
    } catch (err) {
        console.error("Failed to get notifications:", err);
        return res.status(500).json({ error: "Failed to load notifications." });
    }
}

async function createNotifications(req, res) {
    const { user_id, title, message, category, audience } = req.body;
    if (!Number.isInteger(user_id) || user_id <= 0) {
        return res.status(400).json({ error: "A valid user_id is required." });
    }
    if (!title || typeof title !== "string" || !title.trim() || title.length > 90) {
        return res.status(400).json({ error: "A valid title is required (max 90 characters)." });
    }
    if (!message || typeof message !== "string" || !message.trim() || message.length > 600) {
        return res.status(400).json({ error: "A valid message is required (max 600 characters)." });
    }
    if (!category || typeof category !== "string" || category.length > 50) {
        return res.status(400).json({ error: "A valid category is required (max 50 characters)." });
    }
    if (!audience || typeof audience !== "string" || audience.length > 50) {
        return res.status(400).json({ error: "A valid audience is required (max 50 characters)." });
    }

    try {
        const notification = await insertNotification(user_id, title.trim(), message.trim(), category, audience);
        return res.status(201).json(notification);
    } catch (err) {
        console.error("Failed to create notification:", err);
        return res.status(500).json({ error: "Failed to create notification." });
    }
}

async function markNotificationRead(req, res) {
    const notificationId = Number(req.body?.notification_id ?? req.body?.notificationId);
    const userId = Number(req.body?.user_id ?? req.body?.userId);
    if (!Number.isInteger(notificationId) || notificationId <= 0) {
        return res.status(400).json({ error: "A valid notification_id is required." });
    }
    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({ error: "A valid user_id is required." });
    }
    try {
        await insertNotificationRead(notificationId, userId);
        return res.json({ message: "Notification marked as read." });
    } catch (err) {
        console.error("Failed to mark notification as read:", err);
        return res.status(500).json({ error: "Failed to mark notification as read." });
    }
}

module.exports = { getNotificationsController, createNotifications, markNotificationRead };
