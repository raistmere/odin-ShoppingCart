import { expect, test } from "vitest";
import { render, screen, act } from "@testing-library/react";
import CartItem from "./CartItem.jsx";
import userEvent from "@testing-library/user-event";
import pubsub from "../../pubsub/pubsub.js";

let mockItem;

beforeEach(() => {
    // Arrange
    mockItem = { 
        id: "1",
        name: "Apple", 
        imgSrc: "apple.jpg",
        imgAlt: "Apple Image",
        count: 5
    }

    const mockRemoveItem = () => {
        mockItem.count -= 1;
    }

    const mockAddItem = () => {
        mockItem.count += 1;
    }

    pubsub.subscribe("removeItemFromCart", mockRemoveItem);
    pubsub.subscribe("addItemToCart", mockAddItem);
    
});

test("Decrement item count", async () => {
    // Arrange
    const { rerender } = render(<CartItem item={mockItem}/>);
    const user = userEvent.setup();
    const count = screen.getByText("5");
    const decrementButton = screen.getByRole("button", {name: "-"})
    // Act
    await act(async () => {
        await user.click(decrementButton);
    });
    rerender(<CartItem item={mockItem}/>);
    // Assert
    expect(count.textContent).toBe("4");
    
});

// test("Increment item count", async () => {
//     // Arrange
//     const { rerender } = render(<CartItem item={mockItem}/>);
//     const user = userEvent.setup();
//     const count = screen.getByText("5");
//     const incrementButton = screen.getByRole("button", {name: "+"})
//     console.log(count);
//     // Act
//     await act(async () => {
//         await user.click(incrementButton);
//     });
//     rerender(<CartItem item={mockItem}/>);
//     // Assert
//     expect(count.textContent).toBe("6");
    
// });