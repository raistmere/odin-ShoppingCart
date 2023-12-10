import PropTypes from "prop-types";
import styles from "./Item.module.css";
import { useState } from "react";
import pubsub from "../../pubsub/pubsub.js";

const Item = ({item}) => {
    const [count, setCount] = useState(1);
    const {id, name, imgSrc, imgAlt} = item;

    const incrementQtyCount = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrementQtyCount = () => {
        if(count > 1)
        {
            setCount((prevCount) => prevCount - 1);
        }
    };

    const resetQtyCount = () => {
        if(count > 1)
        {
            setCount(1);
        }
    };

    const addToCart = () => {
        // Publish pubsub addToCart
        item.count = count;
        pubsub.publish("addItemToCart", item);
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
                    <h4 className={styles.qtyCount}>{count}</h4>
                    <button onClick={incrementQtyCount}>+</button>
                </div>
                <button className={styles.addButton} onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Item;