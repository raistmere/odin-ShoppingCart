import { beforeEach, expect, test } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Item from "./Item.jsx";

let mockItem;

beforeEach(() => {
    // Arrange
    mockItem = { 
        id: "1",
        name: "Apple", 
        imgSrc: "apple.jpg",
        imgAlt: "Apple Image"
    }
    render(<Item item={mockItem} />);
});

test("Creating new item", () => {
    // Assert
    expect(screen.getByText("Apple"));
});

test("Check if Qty. Count can be incremented", async () => {
    // Arrange
    const user = userEvent.setup();
    const plusButton = screen.getByRole("button", {name:"+"});
    const qtyCount = screen.getByRole("heading", {name:"1"});
    // Act
    await act(async () => {
        await user.click(plusButton);
    });
    // Assert
    expect(qtyCount.textContent).toBe("2");
});

test("Check if Qty. Count can be decremented", async () => {
    // Arrange
    const user = userEvent.setup();
    const plusButton = screen.getByRole("button", {name:"+"});
    const minusButton = screen.getByRole("button", {name:"-"});
    const qtyCount = screen.getByRole("heading", {name:"1"});
    // Act
    await act(async () => {
        await user.click(plusButton); // Increment to 2 because we cannot go below 1 in the qty count.

    });
    await act(async () => {
        await user.click(minusButton); // Then we go ahead and test the decrement.
    });
    // Assert
    expect(qtyCount.textContent).toBe("1");
});

test("Check if Qty. Count never goes below 1", async () => {
    // Arrange
    const user = userEvent.setup();
    const minusButton = screen.getByRole("button", {name:"-"});
    const qtyCount = screen.getByRole("heading", {name:"1"});
    // Act
    await act(async () => {
        await user.click(minusButton); // Then we go ahead and test the decrement.
    });
    // Assert
    expect(qtyCount.textContent).toBe("1");
});

test("Check if [Add to Cart] button resets qtyCount to 1", async () => {
    // Arrange
    const user = userEvent.setup();
    const plusButton = screen.getByRole("button", {name:"+"});
    const addToCartButton = screen.getByRole("button", {name:"Add to Cart"});
    const qtyCount = screen.getByRole("heading", {name:"1"});
    // Act
    await act(async () => {
        await user.click(plusButton); // We want to increase qtyCount to test the reset.
    });
    await act(async () => {
        await user.click(addToCartButton);
    });
    // Assert
    expect(qtyCount.textContent).toBe("1");
});