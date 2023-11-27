import PropTypes from "prop-types";
import styles from "./Item.module.css";

const Item = ({id, name, imgSrc, imgAlt}) => {
    return (
        <div className={styles.item}>
            <h3 className={styles.itemName}>{name}</h3>
            <img src={imgSrc} alt={imgAlt}/>
            <div className={styles.addItemBox}>
                <div className={styles.qtyBox}>
                    <button>-</button>
                    <h4 className={styles.qtyCount}>1</h4>
                    <button>+</button>
                </div>
                <button className={styles.addButton}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Item;