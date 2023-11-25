import PropTypes from "prop-types";
import styles from "./Store.module.css";

const store = () => {
    return (
        <div className={styles.storeWrapper}>
            <h1 className={styles.title}>Mr.VegiGrocer</h1>
            <h2 className={styles.itemBox}>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
                <div className={styles.item}>Item</div>
            </h2>
            <h2 className={styles.cartBox}>View Cart</h2>
        </div>
    )
}

export default store;