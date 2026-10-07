import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import LogoutButton from "../../src/components/LogoutButton";

function LocationDisplay() {
    const location = useLocation();

    return (
        <div data-testid="location">
            {location.pathname}
        </div>
    );
}

describe("LogoutButton", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const getLogoutButton = () =>
        screen.getByRole("button", { name: "Logout" });

    it("renders the logout button", () => {
        render(
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        );

        expect(
            getLogoutButton()
        ).toBeInTheDocument();
    });

    it("logs out when the user confirms", () => {
        // Mock the confirmation dialog to simulate clicking "OK".
        vi.spyOn(window, "confirm")
            .mockReturnValue(true);

        localStorage.setItem(
            "user",
            JSON.stringify({ userId: "123" })
        );

        localStorage.setItem(
            "member",
            JSON.stringify({ name: "John" })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <LogoutButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Logout button.
        fireEvent.click(getLogoutButton());

        // Verify that the user data was removed.
        expect(
            localStorage.getItem("user")
        ).toBeNull();

        // Verify that the member data was removed.
        expect(
            localStorage.getItem("member")
        ).toBeNull();

        // Verify that the user was navigated to the home page.
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/");
    });

    it("does not logout when the user cancels", () => {
        // Mock the confirmation dialog to simulate clicking "Cancel".
        vi.spyOn(window, "confirm")
            .mockReturnValue(false);

        localStorage.setItem(
            "user",
            JSON.stringify({ userId: "123" })
        );

        localStorage.setItem(
            "member",
            JSON.stringify({ name: "John" })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <LogoutButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Logout button.
        fireEvent.click(getLogoutButton());

        // Verify that the user data was NOT removed.
        expect(
            localStorage.getItem("user")
        ).not.toBeNull();

        // Verify that the member data was NOT removed.
        expect(
            localStorage.getItem("member")
        ).not.toBeNull();

        // Verify that navigation did NOT happen.
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/some-page");
    });
});