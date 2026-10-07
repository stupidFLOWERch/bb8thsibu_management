import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
} from "vitest";

import {
    listBoys,
    getMemberRanking,
    getMemberInfo,
    updateMemberInfo,
    listOfficers,
} from "../../src/api/member";

describe("Members API", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("gets boys members", async () => {
        const mockData = {
            members: [
                {
                    id: 1,
                    name: "John",
                    rank: "Pte",
                },
            ],
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await listBoys();

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/listBoys",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );

        expect(result).toEqual(mockData);
    });

    it("gets member ranking", async () => {
        const email = "john@test.com";

        const mockData = {
            rank: "Pte",
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await getMemberRanking(email);

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/get-rank",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("gets member information", async () => {
        const id = 123;

        const mockData = {
            id: 123,
            firstName: "John",
            lastName: "Smith",
            email: "john@test.com",
            rank: "Pte",
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await getMemberInfo(id);

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/get-info",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("updates member information", async () => {
        const id = 123;

        const formdata = {
            First_name: "John",
            Last_name: "Smith",
            Email: "john@test.com",
            Telephone: "0123456789",
            Squad_id: 1,
            Ranks: "Pte",
        };

        const mockData = {
            message: "Member updated successfully",
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await updateMemberInfo(
            id,
            formdata
        );

        expect(fetch).toHaveBeenCalledWith(
            `/api/members/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(formdata),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("gets officers", async () => {
        const mockData = {
            officers: [
                {
                    id: 1,
                    name: "David",
                    rank: "Capt.",
                },
            ],
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await listOfficers();

        expect(fetch).toHaveBeenCalledWith(
            "/api/members/listOfficers",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );

        expect(result).toEqual(mockData);
    });

    it("throws an error when the API request fails", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Member not found",
            }),
        });

        await expect(
            getMemberInfo(123)
        ).rejects.toThrow(
            "Member not found"
        );
    });
});