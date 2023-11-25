import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Item from "./Item.jsx";


test("Creating new item", () => {
    // Arrange
    const mockItem = { 
        name: "Apple", 
        imageSrc: "apple.jpg",
        imageAlt: "Apple Image"
    }
    render(<Item 
        name={mockItem.name} 
        imgSrc={mockItem.imageSrc} 
        imgAlt={mockItem.imageAlt}
    />);
    // Act
    // Assert
    expect(screen.getByText("Apple"));
    const itemImage = screen.getByAltText(mockItem.imageAlt);
    expect(itemImage.getAttribute("src")).toStrictEqual(mockItem.imageSrc);
});