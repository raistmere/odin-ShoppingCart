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
        imageSrc: "apple.jpg",
        imageAlt: "Apple Image"
    }
    render(<Item 
        id={mockItem.id}
        name={mockItem.name} 
        imgSrc={mockItem.imageSrc} 
        imgAlt={mockItem.imageAlt}
    />);
});

test("Creating new item", () => {
    // Assert
    expect(screen.getByText("Apple"));
    const itemImage = screen.getByAltText(mockItem.imageAlt);
    expect(itemImage.getAttribute("src")).toStrictEqual(mockItem.imageSrc);
});

test("Check if Qty. Count can be increased", () => {
    // Arrange
    const addButton = screen.getByRole("button", {name:"+"});
    // Act
    act(() => {
        
    });
    // Assert
});