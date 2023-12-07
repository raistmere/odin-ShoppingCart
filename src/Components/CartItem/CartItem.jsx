import styles from "./CartItem.module.css";

const CartItem = ({id, name, count}) => {
    return (
        <div className={styles.cartItemBox}>
            <img src="" alt="" />
            <p>{name}</p>
            <div className={styles.itemCountBox}>
                <button>-</button>
                <p>{count}</p>
                <button>+</button>
            </div>
        </div>
    )
}

export default CartItem;