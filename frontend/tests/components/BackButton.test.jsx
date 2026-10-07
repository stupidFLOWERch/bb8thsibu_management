import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BackButton from "../../src/components/BackButton";

// Helper component used to display the current route.
// This allows the test to verify that navigation actually happened.
function LocationDisplay() {
    const location = useLocation();

    return (
        <div data-testid="location">
            {location.pathname}
        </div>
    );
}

describe("BackButton", () => {

    // Test that the Back button is rendered correctly.
    it("renders the back button", () => {
        // BackButton uses useNavigate(), so it must be
        // rendered inside a Router.
        render(
            <MemoryRouter>
                <BackButton />
            </MemoryRouter>
        );

        // Verify that a button with the accessible name "Back"
        // is present in the document.
        expect(
            screen.getByRole("button", { name: "Back" })
        ).toBeInTheDocument();
    });

    // Test that clicking the Back button navigates to the home page.
    it("navigate to home when clicked", () => {
        // Start the test at "/some-page" so that we can verify
        // that clicking the button changes the route to "/".
        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <BackButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Simulate the user clicking the Back button.
        fireEvent.click(
            screen.getByRole("button", { name: "Back" })
        );

        // Verify that the current route is now "/".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/");
    });
});