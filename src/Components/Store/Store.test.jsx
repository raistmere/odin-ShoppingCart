import { expect, test } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Store from "./Store.jsx"


test("Check if store renders on screen", () => {
    // Arrange
    render(<Store />);
    let wrapper = document.querySelector(".storeWrapper");
    
    // Act

    // Assert
    expect(wrapper).not.toEqual(null);
    expect(wrapper.classList.contains("storeWrapper")).toBeTruthy();
});

test("Check if item cards rendered", () => {
    // Arrange
    render(<Store />);

    // Act

    // Assert
    
})
