import { Link } from "react-router-dom";
import styles from "../Store/Store.module.css";
import CartItem from "../CartItem/CartItem.jsx";

const Cart = ({cartCount, cartItems}) => {

    console.log("Cart.jsx cartItems: ", cartItems);

    const itemCards = cartItems.map((item) => (
        // IndexOf is just temp placeholder key value. Need to be replaced with something else.
        <CartItem id={item.id} name={item.name} count={item.count}/>
    ));

    return (
        <div className={styles.storeWrapper} data-testid="storeWrapper">
            <h1 className={styles.title}>Mr.VegiGrocer</h1>
            <h2 className={styles.itemBox}>
                {/* We want to go ahead and render all the item cards here if they exist */}
                { cartItems.length > 0 ? itemCards : <p>Empty Cart</p> }
            </h2>
            <div className={styles.storeWrapper}>
                <div className={styles.viewCartBox}>
                    <Link to="/">
                        <p className={styles.viewCartTitle}>Back</p>
                    </Link>
                    <Link  to="/checkout">
                        <p className={styles.viewCartTitle}>Checkout</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart;