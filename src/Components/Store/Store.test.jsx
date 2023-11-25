import { expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Store from "./Store.jsx"

const mockFetchItems = [
    {
        id: 1,
        name: "Pizza"
    },
    {
        id: 2,
        name: "Chicken"
    },
    {
        id: 3,
        name: "Steak"
    }
]

const mockFetch = global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockFetchItems),
    })
);


test("Check if store renders on screen", () => {
    // Arrange
    render(<Store />);
    let wrapper = screen.getByTestId("storeWrapper");
    // Act
    // Assert
    expect(wrapper).not.toEqual(null);
    expect(wrapper.classList.contains("storeWrapper")).toBeTruthy();
});

test("Check if items rendered", async () => {
    // Arrange
    render(<Store />);
    // Act
    // There needs to be a delay because of the fetch request and state change.
    await new Promise((resolve) => setTimeout(() => {
        resolve();
    }, 100));
    // Assert
    mockFetchItems.forEach((item) => {
        expect(screen.getByText(item.name));
    })
});

test("Check if view cart button rendered", () => {
    // Arrange
    render(<Store />);
    const cartButton = screen.getByRole("button", {name:"View Cart"});
    // Act
    // Assert
    expect(cartButton).not.toEqual(null);
});

