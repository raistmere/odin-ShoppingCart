import { Link } from "react-router-dom";
import styles from "../Cart/Cart.module.css";
import CartItem from "../CartItem/CartItem.jsx";

const Cart = ({cartCount, cartItems}) => {

    console.log("Cart.jsx cartItems: ", cartItems);

    const itemCards = cartItems.map((item) => (
        // IndexOf is just temp placeholder key value. Need to be replaced with something else.
        <CartItem key={item.id} item={item}/>
    ));

    return (
        <div className={styles.cartWrapper} data-testid="storeWrapper">
            <h1 className={styles.header}>Mr.VegiGrocer</h1>
            <h2 className={styles.cartTitle}>Your Cart</h2>
            <h2 className={styles.itemBox}>
                {/* We want to go ahead and render all the item cards here if they exist */}
                { cartItems.length > 0 ? itemCards : <p>Empty Cart</p> }
            </h2>
            <h2 className={styles.totalBox}>
                <p className="totalTitle">Total</p>
                <p className="totalCount">$1,403,235</p>
            </h2>
            <div className={styles.checkoutBox}>
                    <Link to="/">
                        <p className={styles.backText}>Back</p>
                    </Link>
                    <Link  to="/checkout">
                        <p className={styles.checkoutText}>Checkout</p>
                    </Link>
            </div>
        </div>
    )
}

export default Cart;