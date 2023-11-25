import PropTypes from "prop-types";

const Item = ({name, imgSrc, imgAlt}) => {
    return (
        <div className="item">
            <h3 className="itemName">{name}</h3>
            <img src={imgSrc} alt={imgAlt}/>
        </div>
    )
}

export default Item;