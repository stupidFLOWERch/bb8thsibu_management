import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    getNotifications,
    createNotification,
    markNotificationRead,
} from "../../src/api/notification";

describe("Notification API", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("gets notifications", async () => {
        const userId = 123;

        const mockData = {
            notifications: [
                {
                    id: 1,
                    title: "Test Notification",
                    message: "This is a test notification.",
                    category: "System",
                },
            ],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await getNotifications(userId);

        expect(fetch).toHaveBeenCalledWith(
            "/api/notification/get-notifications",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    userId,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("creates a notification", async () => {
        const notificationData = {
            userId: 123,
            title: "Test Notification",
            message: "This is a test notification.",
            category: "System",
            audience: "All",
        };

        const mockData = {
            message: "Notification created successfully",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await createNotification(
            notificationData
        );

        expect(fetch).toHaveBeenCalledWith(
            "/api/notification/create-notification",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    user_id: 123,
                    title: "Test Notification",
                    message: "This is a test notification.",
                    category: "System",
                    audience: "All",
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("marks a notification as read", async () => {
        const userId = "123";
        const notificationId = "456";

        const mockData = {
            message: "Notification marked as read",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await markNotificationRead({
            userId,
            notificationId,
        });

        expect(fetch).toHaveBeenCalledWith(
            "/api/notification/mark-notification-read",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    user_id: 123,
                    notification_id: 456,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("throws an error when the API request fails", async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Notification not found",
            }),
        });

        await expect(
            getNotifications(123)
        ).rejects.toThrow(
            "Notification not found"
        );
    });
});