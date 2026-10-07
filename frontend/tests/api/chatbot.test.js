import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    askChatbot
} from "../../src/api/chatbot";

describe("Chatbot API",()=>{
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("sends a message to the chatbot", async()=>{
        const message = "What is uniform policy?";
        const sessionId = "test-session-123";

        const mockData={
            answer: "The uniform policy requires members to wear the correct uniform.",
        };

        global.fetch=vi.fn().mockResolvedValue({
            ok: true,
            json: async()=> mockData,
        });

        const result = await askChatbot(
            message,
            sessionId
        );

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/chat",
            {
                headers:{
                    "Content-Type":"application/json",
                },
                method:"POST",
                body:JSON.stringify({
                    message:message,
                    session_id:sessionId,
                }),
            }
        );
        expect(result).toEqual(mockData);
    });

    it("throws an error when the chatbot API fails", async () => {

        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({
                error: "Chatbot server error",
            }),
        });

        await expect(
            askChatbot(
                "Hello",
                "test-session-123"
            )
        ).rejects.toThrow(
            "Chatbot server error"
        );
    });

});
