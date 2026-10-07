import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    orderInventory,
    getOrderHistory,
    getOrderDetails,
    completeOrder,
} from "../../src/api/order";

describe("Order API", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("orders inventory", async () => {
        const orderData = {
            userId: 123,
            items: [
                {
                    itemId: 1,
                    quantity: 2,
                },
            ],
        };

        const mockData = {
            message: "Order created successfully",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await orderInventory(orderData);

        expect(fetch).toHaveBeenCalledWith(
            "/api/order/order-inventory",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(orderData),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("gets order history", async () => {
        const mockData = {
            orders: [
                {
                    id: 1,
                    status: "Pending",
                },
                {
                    id: 2,
                    status: "Completed",
                },
            ],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await getOrderHistory();

        expect(fetch).toHaveBeenCalledWith(
            "/api/order/history",
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        expect(result).toEqual(mockData);
    });

    it("gets order details", async () => {
        const orderId = 123;

        const mockData = {
            id: 123,
            status: "Pending",
            items: [
                {
                    itemId: 1,
                    quantity: 2,
                },
            ],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await getOrderDetails(orderId);

        expect(fetch).toHaveBeenCalledWith(
            `/api/order/details/${orderId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        expect(result).toEqual(mockData);
    });

    it("completes an order", async () => {
        const orderId = 123;

        const mockData = {
            message: "Order completed successfully",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await completeOrder(orderId);

        expect(fetch).toHaveBeenCalledWith(
            "/api/order/completed",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    orderId,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("throws an error when the API request fails", async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Order not found",
            }),
        });

        await expect(
            getOrderDetails(123)
        ).rejects.toThrow(
            "Order not found"
        );
    });
});