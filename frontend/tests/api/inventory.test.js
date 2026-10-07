import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    showInventory,
    checkStock,
    decreaseStock,
} from "../../src/api/inventory";

describe("Inventory API", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("gets inventory", async () => {
        const mockData = {
            items: [
                {
                    id: 1,
                    name: "Uniform",
                    stock: 10,
                },
            ],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await showInventory();

        expect(fetch).toHaveBeenCalledWith(
            "/api/inventory/show-inventory",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );

        expect(result).toEqual(mockData);
    });

    it("checks stock", async () => {
        const orderId = 123;

        const mockData = {
            available: true,
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await checkStock(orderId);

        expect(fetch).toHaveBeenCalledWith(
            "/api/inventory/check",
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

    it("decreases stock", async () => {
        const orderItems = [
            {
                itemId: 1,
                quantity: 2,
            },
            {
                itemId: 2,
                quantity: 1,
            },
        ];

        const mockData = {
            message: "Stock decreased successfully",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await decreaseStock(orderItems);

        expect(fetch).toHaveBeenCalledWith(
            "/api/inventory/decrease",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    orderItems,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("throws an error when the API request fails", async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Insufficient stock",
            }),
        });

        await expect(
            checkStock(123)
        ).rejects.toThrow(
            "Insufficient stock"
        );
    });
});