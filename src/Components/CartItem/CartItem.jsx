import pubsub from "../../pubsub/pubsub";
import styles from "./CartItem.module.css";

const CartItem = ({item}) => {
    // Deconstructing item
    const {id, name, imgSrc, imgAlt, count} = item;
    // Temp total value for testing till we get it from the item
    let total = "1,403,235";
    
    // 
    const decrementCount = () => {
        pubsub.publish("removeItemFromCart", {...item, count: item.count - 1});
    }

    // 
    const incrementCount = () => {
        console.log(item.count + 1);
        pubsub.publish("addItemToCart", {...item, count: 1});
    }

    return (
        <div className={styles.cartItemBox}>
            <img src={imgSrc} alt={imgAlt} />
            <p className={styles.itemName}>{name}</p>
            <div className={styles.qtyBox}>
                <button onClick={decrementCount}>-</button>
                <p>{count}</p>
                <button onClick={incrementCount}>+</button>
            </div>
            <div className={styles.totalBox}>
                <p>${total}</p>
            </div>
        </div>
    )
}

export default CartItem;