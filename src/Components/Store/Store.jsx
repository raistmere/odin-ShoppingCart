import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Store.module.css";
import Item from "../Item/Item.jsx";
import Cart from "../Cart/Cart.jsx";
// This component handles the store front of the app where items will be rendered to the user to add to
// the cart. There will be a view cart button that will route the user to the cart page.
const Store = ({cartCount}) => {
    // This state holds all the current Item cards being rendered
    const [items, setItems] = useState([]);
    //

    useEffect(() => {
        // On mount we want to go ahead and create item cards to be rendered.
        createItemCards();
    }, []);
    
    // This create all the card items by converting api/json data to [Item] components.
    const createItemCards = async () => {
        // Right now I am fetching from a db.json file but this would be replaced with a server api call.
        const fetchData = await fetch("http://localhost:3000/items");
        const fetchItems = await fetchData.json();
        // Convert the fetchItems into [Item] components into a array of components to be rendered.
        const elementList = fetchItems.map((item) => {
            // Pass the item to create the new item card.
            return <Item key={item.id} item={item} />;
        });
        // Save the current list of items
        setItems(elementList);
    };

    return (
        <div className={styles.storeWrapper} data-testid="storeWrapper">
            <h1 className={styles.title}>Mr.VegiGrocer</h1>
            <h2 className={styles.itemBox}>
                {/* We want to go ahead and render all the item cards here */}
                {items}
            </h2>
            <Link className={styles.viewCartBox} to="/cart">
                <p className={styles.viewCartTitle}>View Cart</p>
                <p className={styles.viewCartCount} data-testid="viewCartCount">{cartCount}</p>
            </Link>
        </div>
    )
}

export default Store;