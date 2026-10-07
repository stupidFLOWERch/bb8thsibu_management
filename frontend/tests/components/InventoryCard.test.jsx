import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import InventoryCard from "../../src/components/InventoryCard";

describe("InventoryCard", () => {

    const mockItem = {
        name: "White Shirt",
        stock: 20,
        orderQty: 2,
        image: "/images/white-shirt.jpg",
    };

    it("displays the item name and stock", () => {
        render(
            <InventoryCard
                item={mockItem}
                onAdd={vi.fn()}
                onMinus={vi.fn()}
            />
        );

        // Verify that the item name is displayed.
        expect(
            screen.getByRole("heading", {
                name: "White Shirt",
            })
        ).toBeInTheDocument();

        // Verify that the stock quantity is displayed.
        expect(
            screen.getByText("Stock: 20")
        ).toBeInTheDocument();
    });

    it("displays the current order quantity", () => {
        render(
            <InventoryCard
                item={mockItem}
                onAdd={vi.fn()}
                onMinus={vi.fn()}
            />
        );

        // Verify that the current order quantity is displayed.
        expect(
            screen.getByText("2")
        ).toBeInTheDocument();
    });

    it("calls onAdd when the plus button is clicked", () => {
        const onAdd = vi.fn();

        render(
            <InventoryCard
                item={mockItem}
                onAdd={onAdd}
                onMinus={vi.fn()}
            />
        );

        // Click the plus button.
        fireEvent.click(
            screen.getByRole("button", { name: "+" })
        );

        // Verify that onAdd was called.
        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it("calls onMinus when the minus button is clicked", () => {
        const onMinus = vi.fn();

        render(
            <InventoryCard
                item={mockItem}
                onAdd={vi.fn()}
                onMinus={onMinus}
            />
        );

        // Click the minus button.
        fireEvent.click(
            screen.getByRole("button", { name: "-" })
        );

        // Verify that onMinus was called.
        expect(onMinus).toHaveBeenCalledTimes(1);
    });
});