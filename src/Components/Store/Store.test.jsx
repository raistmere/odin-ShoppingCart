import { expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Store from "./Store.jsx"
import pubsub from "../../pubsub/pubsub.js";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

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
    render(<BrowserRouter><Store /></BrowserRouter> );
    let wrapper = screen.getByTestId("storeWrapper");
    // Act
    // Assert
    expect(wrapper).not.toEqual(null);
    expect(wrapper.classList.contains("storeWrapper")).toBeTruthy();
});

test("Check if items rendered", async () => {
    // Arrange
    render(
        <MemoryRouter>
            <Store />
        </MemoryRouter> 
    );
    // Act
    // There needs to be a delay because of the fetch request and state change.
    await act(async () => {
        await setTimeout(() => {
            
        }, 100);
    });
    mockFetchItems.forEach((item) => {
        expect(screen.getByText(item.name));
    })
});

test("Check if view cart button rendered", () => {
    // Arrange
    render(
        <MemoryRouter>
            <Store />
        </MemoryRouter> 
    );
    const viewCartTitle = screen.getByText("View Cart");
    // Act
    // Assert
    expect(viewCartTitle).not.toEqual(null);
});

test("Check if view cart count get updated based on cartCount prop", async () => {
    // Arrange
    render(
        <MemoryRouter>
            <Store cartCount={5}/>
        </MemoryRouter> 
    );
    const viewCartTitle = screen.getByTestId("viewCartCount");
    // Act
    // Assert
    expect(viewCartTitle.textContent).toBe("5");
});



