const { sql } = require("../db");

async function getNotifications(userId) {
    const request = new sql.Request();

    const result = await request
        .input("userId", sql.Int, userId)
        .query(`
            SELECT 
                n.id AS notificationId,
                n.title, 
                n.message, 
                n.category,
                n.audience,
                n.created_at, 
                n.created_by,
                CASE
                    WHEN nr.user_id IS NULL THEN 1
                    ELSE 0
                END AS unread
            FROM Notifications n
            LEFT JOIN NotificationRead nr
                ON n.id = nr.notification_id
                AND nr.user_id = @userId
            ORDER BY n.created_at DESC
        `);

    return result.recordset;
}

async function insertNotification (user_id, title, message, category, audience) {
    const request = new sql.Request();

    const result = await request
        .input("user_id", sql.Int, user_id)
        .input("title", sql.VarChar(90), title)
        .input("message", sql.VarChar(600), message)
        .input("category", sql.VarChar(50), category)
        .input("audience", sql.VarChar(50), audience)
        .query(`
            INSERT INTO Notifications (created_by, title, message, category, audience)
            OUTPUT INSERTED.id AS notificationId
            VALUES (@user_id, @title, @message, @category, @audience)
        `);
    return result.recordset[0];
}

async function insertNotificationRead (notification_id, user_id) {
    const request = new sql.Request();

    const result = await request
        .input("notification_id", sql.Int, notification_id)
        .input("user_id", sql.Int, user_id)
        .query(`
            IF NOT EXISTS (
                SELECT 1 FROM NotificationRead
                WHERE notification_id = @notification_id AND user_id = @user_id
            )
            BEGIN
                INSERT INTO NotificationRead (notification_id, user_id)
                VALUES (@notification_id, @user_id)
            END
        `);
    return result;
}
module.exports = { getNotifications, insertNotification, insertNotificationRead };
