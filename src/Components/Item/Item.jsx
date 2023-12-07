import PropTypes from "prop-types";
import styles from "./Item.module.css";
import { useState } from "react";
import pubsub from "../../pubsub/pubsub.js";

const Item = ({id, name, imgSrc, imgAlt}) => {
    const [qtyCount, setQtyCount] = useState(1);

    const incrementQtyCount = () => {
        setQtyCount((prevCount) => prevCount + 1);
    };

    const decrementQtyCount = () => {
        if(qtyCount > 1)
        {
            setQtyCount((prevCount) => prevCount - 1);
        }
    };

    const resetQtyCount = () => {
        if(qtyCount > 1)
        {
            setQtyCount(1);
        }
    };

    const addToCart = () => {
        // Publish pubsub addToCart
        pubsub.publish("updateCartCount", {id, name, imgSrc, imgAlt, count: qtyCount});
        // Reset item quantity right after adding to cart.
        resetQtyCount();
    }

    return (
        <div className={styles.item}>
            <h3 className={styles.itemName}>{name}</h3>
            <img src={imgSrc} alt={imgAlt}/>
            <div className={styles.addItemBox}>
                <div className={styles.qtyBox}>
                    <button onClick={decrementQtyCount}>-</button>
                    <h4 className={styles.qtyCount}>{qtyCount}</h4>
                    <button onClick={incrementQtyCount}>+</button>
                </div>
                <button className={styles.addButton} onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Item;