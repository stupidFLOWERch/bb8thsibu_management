import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    showMemberBySquad,
    submitAttendance,
    checkAttendance,
} from "../../src/api/attendance";

describe("Attendance API", () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("gets members by squad", async () => {
        const mockData = {
            members: [
                {
                    id: 1,
                    name: "John",
                },
            ],
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await showMemberBySquad();

        expect(fetch).toHaveBeenCalledWith(
            "/api/attendance/show-member-squad",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            }
        );

        expect(result).toEqual(mockData);
    });

    it("submits attendance data", async () => {
        const payload = {
            memberId: 1,
            date: "2026-10-07",
            status: "Present",
        };

        const mockData = {
            message: "Attendance submitted successfully",
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await submitAttendance(payload);

        expect(fetch).toHaveBeenCalledWith(
            "/api/attendance/submit",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(payload),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("checks attendance for a date", async () => {
        const mockData = {
            exists: true,
        };

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const result = await checkAttendance("2026-10-07");

        expect(fetch).toHaveBeenCalledWith(
            "/api/attendance/check",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    date: "2026-10-07",
                }),
            }
        );

        expect(result).toEqual(mockData);
    });

    it("throws an error when the API request fails", async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Attendance already submitted",
            }),
        });

        await expect(
            checkAttendance("2026-10-07")
        ).rejects.toThrow(
            "Attendance already submitted"
        );
    });
});