import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import HomeButton from "../../src/components/HomeButton";

function LocationDisplay() {
    const location = useLocation();

    return (
        <div data-testid="location">
            {location.pathname}
        </div>
    );
}

describe("HomeButton", () =>{

    beforeEach(() => {
        localStorage.clear();
    });

    const getHomeButton = () =>
        screen.getByRole("button", {
            name: "Home"
        });

    it("renders the home button", () =>{
        render(
            <MemoryRouter>
                <HomeButton />
            </MemoryRouter>
        );

        expect(
            getHomeButton()
        ).toBeInTheDocument();

    });

    it("navigate to home when no user", () =>{
        render(
            <MemoryRouter>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        fireEvent.click(getHomeButton());

        expect(
            screen.getByTestId("location").textContent
        ).toBe("/");
    }); 

    // Test that Pte rank is redirected to the normal menu.
    it("navigates Boys Pte user to /menu", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                role: "Boys",
                rank: "Pte",
            })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Home button.
        fireEvent.click(
            screen.getByRole("button", { name: "Home" })
        );

        // Boys with Pte rank should go to "/menu".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/menu");
    });
    
    // Test that a Boys user with a rank other than Pte
    // is redirected to the NCO menu.
    it("navigates Boys non-Pte user to /nco-menu", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                role: "Boys",
                rank: "Cpl",
            })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Home button.
        fireEvent.click(
            screen.getByRole("button", { name: "Home" })
        );

        // Boys with a rank other than Pte should go to "/nco-menu".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/nco-menu");
    });

    // Test that an Officers user with the Capt rank
    // is redirected to the normal menu.
    it("navigates Officers Capt user to /menu", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                role: "Officers",
                rank: "Capt.",
            })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Home button.
        fireEvent.click(
            screen.getByRole("button", { name: "Home" })
        );

        // Officers with Capt rank should go to "/menu".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/officer-menu");
    });

    // Test that an Officers user with a rank other than Capt
    // is redirected to the officer menu.
    it("navigates Officers non-Capt user to /officer-menu", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                role: "Officers",
                rank: "Lt.",
            })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Home button.
        fireEvent.click(
            screen.getByRole("button", { name: "Home" })
        );

        // Officers with a rank other than Capt should go
        // to "/officer-menu".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/officer-menu");
    });

    // Test that an unknown role is redirected to the home page.
    it("navigates unknown role to /", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                role: "Unknown",
                rank: "Unknown",
            })
        );

        render(
            <MemoryRouter initialEntries={["/some-page"]}>
                <HomeButton />
                <LocationDisplay />
            </MemoryRouter>
        );

        // Click the Home button.
        fireEvent.click(
            screen.getByRole("button", { name: "Home" })
        );

        // An unknown role should fall through to the final
        // else statement and navigate to "/".
        expect(
            screen.getByTestId("location").textContent
        ).toBe("/");
    });
});