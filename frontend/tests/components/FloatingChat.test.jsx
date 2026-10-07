import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FloatingChat from "../../src/components/FloatingChat";
import { askChatbot } from "../../src/api/chatbot";

vi.mock("../../src/api/chatbot", () => ({
    askChatbot: vi.fn(),
}));

describe("FloatingChat", () => {
    beforeEach(() => {
        // Create a fake logged-in user for every test.
        // FloatingChat reads userId from localStorage.
        localStorage.setItem(
            "user",
            JSON.stringify({
                userId: "test-user-123",
            })
        );

        // Reset the mock so each test starts with no previous API calls.
        askChatbot.mockReset();
    });

    // Helper function to find the button that opens the chat panel.
    const getOpenChatButton = () =>
        screen.getByRole("button", {
            name: "Open chat",
        });

    // Helper function to find the Send button inside the chat panel.
    const getSendButton = () =>
        screen.getByRole("button", { name: "Send" });

    // Test that the chat button is rendered when FloatingChat loads.
    it("render the chat button", () => {
        render(<FloatingChat />);

        expect(
            getOpenChatButton()
        ).toBeInTheDocument();
    });

    // Test that clicking the chat button opens the chat panel.
    it("opens the chat panel when clicked", () => {
        render(<FloatingChat />);

        // The chat panel should not be visible initially.
        expect(
            screen.queryByText("Uniform Manual Chatbot")
        ).not.toBeInTheDocument();

        // Click the button to open the chat panel.
        fireEvent.click(
            getOpenChatButton()
        );

        // The chat panel should now be visible.
        expect(
            screen.queryByText("Uniform Manual Chatbot")
        ).toBeInTheDocument();
    });

    // Test that clicking the close button hides the chat panel.
    it("closes the panel when clicked again", () => {
        render(<FloatingChat />);

        // Open the chat panel first.
        fireEvent.click(
            getOpenChatButton()
        );

        expect(
            screen.queryByText("Uniform Manual Chatbot")
        ).toBeInTheDocument();

        // Click the close button.
        fireEvent.click(
            screen.getByRole("button", {
                name: "Close chat",
            })
        );

        // The chat panel should no longer be visible.
        expect(
            screen.queryByText("Uniform Manual Chatbot")
        ).not.toBeInTheDocument();
    });

    // Test that the chatbot API is called automatically
    // to load the initial welcome message.
    it("loads the welcome message", () => {
        render(<FloatingChat />);

        expect(
            askChatbot
        ).toHaveBeenCalledWith(
            "hello",
            "test-user-123"
        );
    });

    // Test that the welcome message returned by the API
    // is displayed in the chat panel.
    it("displays the welcome message", async () => {
        // Mock the response from the initial chatbot request.
        askChatbot.mockResolvedValueOnce({
            answer: "Hello! How can I help you?",
        });

        render(<FloatingChat />);

        // Open the panel so the messages are visible.
        fireEvent.click(
            getOpenChatButton()
        );

        // Wait for the asynchronous API response
        // and check that it appears in the UI.
        expect(
            await screen.findByText(
                "Hello! How can I help you?"
            )
        ).toBeInTheDocument();
    });

    // Test that the user can type a message into the chat input.
    it("allows the user to type a message", () => {
        render(<FloatingChat />);

        // Open the chat panel to access the input.
        fireEvent.click(
            getOpenChatButton()
        );

        const input = screen.getByPlaceholderText(
            "Type message..."
        );

        // Simulate the user typing a message.
        fireEvent.change(input, {
            target: {
                value: "How do I wear the uniform?",
            },
        });

        // Verify that the input contains the typed message.
        expect(input).toHaveValue(
            "How do I wear the uniform?"
        );
    });

    // Test that clicking Send calls the chatbot API
    // with the user's message and session ID.
    it("sends the message when Send is clicked", () => {
        render(<FloatingChat />);

        // Open the chat panel.
        fireEvent.click(
            getOpenChatButton()
        );

        const input = screen.getByPlaceholderText(
            "Type message..."
        );

        // Type a message.
        fireEvent.change(input, {
            target: {
                value: "What uniform should I wear?",
            },
        });

        // Send the message.
        fireEvent.click(
            getSendButton()
        );

        // Verify that the API received the correct message
        // and the correct user's session ID.
        expect(
            askChatbot
        ).toHaveBeenCalledWith(
            "What uniform should I wear?",
            "test-user-123"
        );
    });

    // Test that the chatbot's response is displayed after the user sends a message.
    it("displays the bot response", async () => {
        // First API call: load the welcome message.
        // Second API call: respond to the user's message.
        askChatbot
            .mockResolvedValueOnce({
                answer: "Hello! How can I help you?",
            })
            .mockResolvedValueOnce({
                answer: "You should wear the correct uniform.",
            });

        render(<FloatingChat />);

        // Open the chat panel.
        fireEvent.click(
            getOpenChatButton()
        );

        const input = screen.getByPlaceholderText(
            "Type message..."
        );

        // Type the user's message.
        fireEvent.change(input, {
            target: {
                value: "What uniform should I wear?",
            },
        });

        // Send the message.
        fireEvent.click(
            getSendButton()
        );

        // Wait for the chatbot response and verify
        // that it is displayed in the chat.
        expect(
            await screen.findByText(
                "You should wear the correct uniform."
            )
        ).toBeInTheDocument();
    });

    // Test that an empty message does not trigger
    // an additional chatbot API request.
    it("does not send an empty message", () => {
        render(<FloatingChat />);

        // Open the chat panel.
        fireEvent.click(
            getOpenChatButton()
        );

        // Click Send without entering a message.
        fireEvent.click(
            getSendButton()
        );

        // The only API call should be the automatic welcome message request.
        expect(
            askChatbot
        ).toHaveBeenCalledWith(
            "hello",
            "test-user-123"
        );

        // No second API call should be made for the empty message.
        expect(
            askChatbot
        ).toHaveBeenCalledTimes(1);
    });

    // Test that a failed chatbot API request displays an error message to the user.
    it("displays Server error when the API fails", async () => {
        // First API call succeeds for the welcome message.
        // Second API call fails when the user sends a message.
        askChatbot
            .mockRejectedValueOnce(
                new Error("Server error")
            );

        render(<FloatingChat />);

        // Open the chat panel.
        fireEvent.click(
            getOpenChatButton()
        );

        // Wait for the error response and verify that the error message is displayed.
        expect(
            await screen.findByText("Server error")
        ).toBeInTheDocument();
    });
});